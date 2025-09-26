/* eslint-disable @typescript-eslint/no-explicit-any */
import { PluginOptions, StrRegExp } from '../types/model';
import { escapeRegExpNamesMaker } from './escapeRegExpNames.maker';
import { makeRegExp } from './makeRegExp';
import { testMaker } from './test.maker';
import { GroupInfo, GroupName, GroupStubSymbol } from './types';
import { checkIs2xSlashes, checkIs4xSlashes, flags } from './utils';

setTimeout(testMaker, 500);

let resetStubCharCode = 9999;
const nameDisablerFuncName = 'escapeRegExpNames';
const localErrorPrefix = '###LOCAL##ERROR###';

export class TransformProcess {
  makerInvokesContentSplitterRegExp: RegExp;
  content: string;
  fileMD5: string;
  fileImportPath: string;

  quantifierRegStr = '[?+*]\\??|{,\\d+}\\??|{\\d+,\\d*?}\\??|{\\d+}\\??' as const;
  stringQuotedContentRegStr = '`((?:(?:\\\\{2})+\\\\`|(?<!\\\\)\\\\`|[^`])*?)`' as const;
  sortGroupIndexes = (a: number, b: number) => a - b;

  escapeRegExpNames = escapeRegExpNamesMaker(checkIs4xSlashes, 2, (groupName, namePostfix) =>
    namePostfix
      ? `(?<${groupName}${this.stubs.groupPostfixDiv}${namePostfix}>`
      : `(?<${this.stubs.disabledGroupName}${groupName}>`,
  );

  toolsCommentSlashStub = '';

  stubs = {
    string: '',
    number: '',
    optionalNumber: '',
    empty: '',
    disjunction: '',
    groupPostfixDiv: '',
    optional: '',
    untemplated: '',
    freeUntemplated: '',
    slash: '',
    dollar: '',
    escape: '',
    openParenthesis: '',
    closeParenthesis: '',
    disabledGroupName: '',
  };

  flags = { ...flags };

  groupNameToSymbolDict = {} as Record<GroupName, GroupStubSymbol>;

  constructor(
    private pluginOptions: PluginOptions = {
      collectClassCharactersMaxCount: 9,
    },
    options: { importNameMatch: RegExpMatchArray; content: string; fileMD5: string; fileImportPath: string },
  ) {
    this.fileMD5 = options.fileMD5;
    this.fileImportPath = options.fileImportPath;
    this.content = options.content;

    this.makerInvokesContentSplitterRegExp = makeRegExp(
      `/${
        options.importNameMatch[1] ?? 'makeNamedRegExp'
      }\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
    );
  }

  stubCharCode = resetStubCharCode;
  makeStub = (text: string) => {
    do this.stubCharCode += 5;
    while (text.includes(String.fromCharCode(this.stubCharCode)));
    return String.fromCharCode(this.stubCharCode);
  };

  setStubSymbols = (regStr: string) => {
    for (const name in this.stubs) {
      this.stubs[name as 'string'] = this.makeStub(regStr);
    }
  };

  setGroupStubSymbols = (regStr: string) => {
    const groupStubSymbols: GroupStubSymbol[] = [];

    regStr.replace(makeRegExp('/\\(/g'), (all, slashes) => {
      if (checkIs4xSlashes(slashes)) return all;
      groupStubSymbols.push(this.makeStub(regStr) as never);
      return all;
    });

    return groupStubSymbols;
  };

  process = () => {
    this.stubCharCode = resetStubCharCode;
    this.toolsCommentSlashStub = this.makeStub(this.content);
    resetStubCharCode = this.stubCharCode;

    this.content = this.cutFileComments(this.content);
    this.content = this.content.replace(
      makeRegExp(`/${nameDisablerFuncName}[(]\\s*([\\w_$]+)\\s*,\\s*(['\`"])([\\w_$]+?)\\2\\s*,?\\s*[)]/g`),
      `${nameDisablerFuncName}($1,"$3")`,
    );

    const splits = this.content.split(this.makerInvokesContentSplitterRegExp);
    const namespaces: string[] = [];
    const registeredTypeKeysSet = new Set<string>();

    for (let userRegStri = 1; userRegStri < splits.length; userRegStri++) {
      this.stubCharCode = resetStubCharCode;

      const tools: Partial<Record<'stringify', string[]>> = {};
      const userRegStr = splits[userRegStri]
        .replace(makeRegExp(`/${this.toolsCommentSlashStub}(.+)/g`), (_all, toolStr: string) => {
          const [toolName, ...params] = toolStr.split(makeRegExp('/\\s+/'));

          tools[toolName as 'stringify'] = params;
          return '';
        })
        .trim();

      const leadRegQuote = userRegStr[0];
      const findFreeBracketReg = makeRegExp(`/(?<!\\\\)(?:\\\\{2})*\\\`/`);
      const findConcatenatesReg = makeRegExp('/(?<!(?:\\\\{2})*\\\\)`/');
      const index = userRegStr.slice(1).search(findFreeBracketReg);
      const userWritedRegStr = userRegStr?.slice(1, index + 1);

      const match = userWritedRegStr.match(findConcatenatesReg);

      if (match) {
        console.info(userWritedRegStr);
        throw `StringRegExp can not be concatenated template string`;
      }

      if (leadRegQuote !== '`') {
        console.info(userWritedRegStr);
        throw `StringRegExp must be template string - like makeNamesRegExp(\`/ /g\`)`;
      }

      let countableGroupi = 0;
      let uncountableGroupi = 0;
      this.groupNameToSymbolDict = {} as Record<GroupName, GroupStubSymbol>;

      const groups: Record<number, string> = {};
      const groupSymbolsDict: Record<number, GroupStubSymbol> = {};
      const countableGroupSymbolsDict: Record<number, GroupStubSymbol> = {};
      const symbolGroupsDict: Record<GroupStubSymbol, number> = {} as never;

      let regStr = userWritedRegStr.slice(1, userWritedRegStr.lastIndexOf('/'));
      const regFlags = userWritedRegStr.slice(regStr.length + 2);

      for (const flagKey in this.flags) {
        this.flags[flagKey as 'i'] = regFlags.includes(flagKey);
      }
      this.setStubSymbols(regStr);

      regStr = this.replaceFileConstants(regStr);

      const groupStubSymbols = this.setGroupStubSymbols(regStr);

      regStr = this.replaceEscapeds(regStr);
      regStr = this.replaceStringTemplateInserts(regStr);

      const regStrForTypeKey = this.replaceEnumsWithStringTemplatePrefix(regStr);

      regStr = this.replaceEnums(regStr);

      regStr = this.insertGroupsWithReplace({
        regStr,
        groups,
        groupStubSymbols,
        groupSymbolsDict,
        countableGroupSymbolsDict,
        symbolGroupsDict,
      });

      try {
        const groupSymbols = Object.values(groupSymbolsDict);
        const countableGroupSymbols = Object.values(countableGroupSymbolsDict);

        const groupIndexes = Object.keys(groups).map(Number).sort(this.sortGroupIndexes);
        const uncountableGroupSymbolToInfoDict: Partial<Record<GroupStubSymbol, GroupInfo>> = {};

        const isEachGroupIsOptional = regStr
          .replace(makeRegExp(`/\\[([^${this.stubs.string}]+?)\\](${this.quantifierRegStr}|)/g`), this.stubs.string)
          .includes('|');

        const groupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo> = {
          [GroupStubSymbol.zero]: {
            isRoot: true,
            isOpt: false,
            isOptChildren: isEachGroupIsOptional,
            isOptAsChild: false,
            name: GroupName.zero,
            groupSymbol: GroupStubSymbol.zero,
            groupStr: regStr,
            content: regStr,
            key: '',
            isHasSubTypes: this.checkIsHasSubTypes(regStr, groupSymbols),
            isCountable: true,
            parent: null,
            isNever: false,
            isNumName: true,
            topName: null,
          },
        };

        for (const groupIndex of groupIndexes) {
          const groupStr = groups[groupIndex];
          const groupNameMatch = groupStr.match(makeRegExp('/\\((\\?(?:<[!=]|<([^>]*?)>|))?/'));

          if (groupNameMatch === null) throw `${localErrorPrefix}Incorrect RegExp group`;
          const matchedGroupName = groupNameMatch[2] as GroupName | undefined;
          const isNoname = matchedGroupName === undefined;
          const isGroupNameDisabled = matchedGroupName?.startsWith(this.stubs.disabledGroupName);

          if (!isNoname) {
            if (matchedGroupName === GroupName.empty) throw `${localErrorPrefix}Group name can not be empty - <>`;
            if (
              matchedGroupName.match(
                makeRegExp(`/^\\d|[^${this.stubs.disabledGroupName}${this.stubs.groupPostfixDiv}$_\\w]/`),
              )
            )
              throw `${localErrorPrefix}Incorrect group name - <${matchedGroupName}>`;
          }

          const groupSymbol = groupSymbolsDict[groupIndex];

          const isUncountable = isNoname && groupNameMatch[1] !== undefined;

          const isOptAsChild =
            isEachGroupIsOptional ||
            this.checkIsGroupOptional(groupStr) ||
            Object.values(groupSymbolToInfoDict).some(({ groupStr, isOpt, isOptChildren }) => {
              if (!groupStr.includes(groupSymbol)) return false;
              return isOpt || isOptChildren;
            });

          if (isUncountable) {
            const { groupContent, groupKey } = this.extractGroupKeyAndContent(groupStr);
            const groupName = `${++uncountableGroupi}` as GroupName;

            uncountableGroupSymbolToInfoDict[groupSymbol] = {
              isRoot: false,
              isOpt: false,
              isOptChildren: groupKey.includes('!') || groupContent.includes('|'),
              isOptAsChild,
              content: groupContent,
              key: groupKey,
              name: groupName,
              groupStr,
              groupSymbol,
              isHasSubTypes: false,
              isCountable: false,
              parent: null,
              isNever: false,
              isNumName: false,
              topName: null,
            };

            continue;
          }

          const groupContent = groupStr.slice(isNoname ? 1 : matchedGroupName.length + 4, groupStr.lastIndexOf(')'));
          const isOptChildren = isEachGroupIsOptional || groupContent.includes('|');

          const numName = `$${++countableGroupi}` as GroupName;
          const isNumName = isGroupNameDisabled || matchedGroupName == null;
          const groupName = isNumName ? numName : matchedGroupName;
          this.groupNameToSymbolDict[groupName] = groupSymbol;

          groupSymbolToInfoDict[groupSymbol] = {
            isRoot: false,
            isOpt: false,
            isOptChildren,
            isOptAsChild,
            groupStr,
            groupSymbol,
            name: groupName,
            topName: isGroupNameDisabled
              ? (matchedGroupName?.replace(makeRegExp('/[^\\w_$]+/g'), '') as never) ?? null
              : null,
            isNumName,
            content: groupContent,
            key: '',
            isHasSubTypes: this.checkIsHasSubTypes(groupStr, groupSymbols),
            isCountable: true,
            parent: null,
            isNever: false,
          };
        }

        const groupTypeParts: string[] = [];
        const groupTypeContentsDict = {} as Record<GroupName, string>;
        const groupTypeContentsToNameDict = {} as Record<string, GroupInfo>;
        const uncountableGroupPartTypes: string[] = [];
        const recordFieldsTypes: string[] = [];
        const wholeGroupSymbolToInfoDict = { ...groupSymbolToInfoDict, ...uncountableGroupSymbolToInfoDict };
        this.setGroupInfoParents(wholeGroupSymbolToInfoDict);

        Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
          if (groupInfo.isRoot) return;

          groupInfo.isNever = this.checkIsGroupNever(groupInfo);

          groupInfo.isOpt ||= this.checkIsOptionalQuantifier(
            groupInfo.groupStr.slice(groupInfo.groupStr.lastIndexOf(')') + 1),
          );

          groupInfo.isOptAsChild ||= this.someOfGroupParents(
            groupInfo,
            parentInfo => parentInfo.isOpt || parentInfo.isOptChildren,
          );
        });

        Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
          if (groupTypeContentsDict[groupInfo.name] !== undefined)
            throw `${localErrorPrefix}Inclusive group name - <${groupInfo.name}>`;

          groupTypeContentsDict[groupInfo.name] = this.makeGroupTypeFromGroupContent({
            wholeGroupSymbolToInfoDict,
            groupStubSymbols,
            groupInfo,
            countableGroupSymbols,
          });
        });

        Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
          if (groupTypeContentsToNameDict[groupInfo.content] !== undefined) return;
          groupTypeContentsToNameDict[groupInfo.content] = groupInfo;
        });

        const makeTypeText = (
          typeName: string,
          sameContentGroupName: string,
          typeContent: string,
          groupInfo: GroupInfo,
        ) => {
          return `type ${typeName} = ${tools.stringify?.includes(typeName) ? 'string; // ' : ''}${
            groupInfo.topName
              ? this.makeGroupTypeName(groupInfo, 'topName')
              : sameContentGroupName &&
                sameContentGroupName !== typeName &&
                sameContentGroupName.length < typeContent.length
              ? sameContentGroupName
              : typeContent
          };`;
        };

        Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
          if (groupInfo.isCountable) {
            const typeName = this.makeGroupTypeName(groupInfo);

            recordFieldsTypes.push(
              `${groupInfo.name.replace(makeRegExp(`/${this.stubs.groupPostfixDiv}/g`), '')}${
                groupInfo.isOpt || groupInfo.isOptAsChild || groupInfo.isNever ? '?' : ''
              }: ${typeName}`,
            );
            const typeContent = groupTypeContentsDict[groupInfo.name];
            const sameContentGroupName = this.makeGroupTypeName(groupTypeContentsToNameDict[groupInfo.content]);

            groupTypeParts.push(makeTypeText(typeName, sameContentGroupName, typeContent, groupInfo));
          } else {
            const typeName = this.makeUncountableGroupTypeName(groupInfo.name);

            const sameContentGroupName = groupTypeContentsToNameDict[groupInfo.content].isCountable
              ? this.makeGroupTypeName(groupTypeContentsToNameDict[groupInfo.content])
              : this.makeUncountableGroupTypeName(groupTypeContentsToNameDict[groupInfo.content].name);

            const typeContent = groupInfo.key.endsWith(':')
              ? groupTypeContentsDict[groupInfo.name]
              : groupInfo.key.includes('<')
              ? `LookbehindAssertion<${groupTypeContentsDict[groupInfo.name]}>`
              : `LookaheadAssertion<${groupTypeContentsDict[groupInfo.name]}>`;

            uncountableGroupPartTypes.push(makeTypeText(typeName, sameContentGroupName, typeContent, groupInfo));
          }
        });

        const typeKey = this.makeRegTypeKey(regStrForTypeKey, regFlags);

        if (registeredTypeKeysSet.has(typeKey)) continue;
        registeredTypeKeysSet.add(typeKey);

        if (uncountableGroupPartTypes.length) uncountableGroupPartTypes.unshift('');

        namespaces.push(
          `namespace ${this.makeNamespaceTypeName('', namespaces.length)} {\n  ${
            //
            groupTypeParts.concat(uncountableGroupPartTypes).join('\n  ')
          }\n\n  export interface I extends Record<\n    ${typeKey},\n    ${
            this.flags.i ? 'IgnoreCaseRecord<' : ''
          }{\n      ${
            //
            recordFieldsTypes.join(';\n      ')
          }\n    }${this.flags.i ? '>' : ''}\n  > { '': '' }\n}`,
        );
      } catch (error) {
        const typeKey = this.makeRegTypeKey(regStrForTypeKey, regFlags);
        if (!`${error}`.startsWith(localErrorPrefix)) throw error;
        console.error(`${error}`.slice(localErrorPrefix.length));

        namespaces.push(
          `namespace ${
            //
            this.makeNamespaceTypeName('', namespaces.length)
          } {\n  export interface I extends Record<\n    ${
            //
            typeKey
          },\n    \`${
            //
            `${error}`.slice(localErrorPrefix.length).replace(makeRegExp('/`/g'), '\\`')
          }\`> { '': '' }\n}`,
        );
      }
    }

    if (!namespaces.length) return null;

    return {
      types: `/* eslint-disable @typescript-eslint/no-unused-vars */\n/* eslint-disable @typescript-eslint/no-namespace */\n${
        this.fileImportPath
      }\n\n${
        //
        namespaces.join('\n\n')
      }\n\ninterface _GlobalScopedNamedRegExpMakerGeneratedTypes\n  extends ${
        //
        namespaces.map(this.makeNamespaceDotITypeName).join(',\n    ')
      } {\n    '': ''\n}`,
    };
  };

  makeGroupTypeName = (groupInfo?: GroupInfo, nameField: 'name' | 'topName' = 'name') => {
    if (!groupInfo) return '';

    return (groupInfo.isNumName && groupInfo.topName === null) ||
      (groupInfo[nameField]?.startsWith('$') && !(groupInfo[nameField].slice(1) in this.groupNameToSymbolDict))
      ? groupInfo[nameField] ?? ''
      : `$${groupInfo[nameField]}`.replace(makeRegExp(`/${this.stubs.groupPostfixDiv}/g`), '');
  };
  makeUncountableGroupTypeName = (groupName: GroupName) => `U${groupName}`;

  makeNamespaceTypeName = (_text: string, index: number) => `N${this.fileMD5}_${index + 1}`;
  makeNamespaceDotITypeName = (text: string, index: number) => `${this.makeNamespaceTypeName(text, index)}.I`;

  checkIsHasSubTypes = (regStr: string, groupSymbols: GroupStubSymbol[]) => {
    return groupSymbols.some(char => regStr.includes(char));
  };

  makeRegTypeKey = (keyRegStr: string, regFlags: string) => {
    return `\`/${
      keyRegStr
        .replace(makeRegExp(`/${this.stubs.disabledGroupName}/g`), '')
        .replace(makeRegExp(`/${this.stubs.disjunction}{3}/g`), '\\\\|')
        .replace(makeRegExp(`/${this.stubs.escape}{2}([bBpP])/g`), '\\\\$1')
        .replace(makeRegExp(`/[${this.stubs.slash}${this.stubs.escape}]/g`), '\\')
        .replace(makeRegExp(`/[${this.stubs.freeUntemplated}${this.stubs.untemplated}]/g`), '\\${')
        .replace(makeRegExp(`/${this.stubs.string}/g`), '${string}')
        .replace(makeRegExp(`/${this.stubs.dollar}/g`), '$')
        .replace(makeRegExp(`/${this.stubs.openParenthesis}{3}/g`), '\\\\(')
        .replace(makeRegExp(`/${this.stubs.closeParenthesis}{3}/g`), '\\\\)')
        .replace(makeRegExp(`/${this.stubs.groupPostfixDiv}[\\w_$]+/g`), '')
      //
    }/${regFlags}\``;
  };

  extractGroupKeyAndContent = (groupStr: string) => {
    const groupParts = groupStr
      .slice(0, groupStr.lastIndexOf(')'))
      .match(makeRegExp('/^\\(\\?(<[=!]|[a-z]*(?:-[a-z]*)?:|[:=!]|)(.*)/'));

    if (groupParts === null)
      return {
        groupKey: '',
        groupContent: '',
      };

    return {
      groupKey: groupParts[1],
      groupContent: groupParts[2],
    };
  };

  replaceEnumsWithStringTemplatePrefix = (regStr: string) => {
    return regStr.replace(
      makeRegExp(
        `/(?<!${this.stubs.escape})\\[(?:${this.stubs.escape}{2}]|.)*?[$]\\\\?{(?:${this.stubs.escape}{2}]|.)*?(?<!${this.stubs.escape})]/g`,
      ),
      this.stubs.string,
    );
  };

  replaceEnums = (regStr: string) => {
    regStr = regStr.replace(
      makeRegExp(
        `/((?:(\\\\*)\\[(?:\\d[-\\d]*\\d)?]|(\\\\+)d)(${this.quantifierRegStr}|))|(?<!${this.stubs.escape})\\[(?:${this.stubs.escape}{2}]|.)+?(?<!${this.stubs.escape})]/g`,
      ),
      (
        all,
        isNumericEnum: string | undefined,
        enumSlashes: string | undefined,
        numberSlashes: string | undefined,
        quantifier: string | undefined,
      ) => {
        if (isNumericEnum !== undefined) {
          const returnNumber = this.checkIsOptionalQuantifier(quantifier)
            ? this.stubs.optionalNumber
            : this.stubs.number;

          if (numberSlashes !== undefined) {
            return checkIs2xSlashes(numberSlashes) ? returnNumber : all;
          }

          return checkIs4xSlashes(enumSlashes) ? all : returnNumber;
        }

        return this.stubs.string;
      },
    );

    return regStr;
  };

  checkIsGroupNever = (groupInfo: GroupInfo) => {
    return (
      groupInfo.isNever ||
      groupInfo.key.includes('!') ||
      this.someOfGroupParents(groupInfo, groupInfo => {
        return groupInfo.key.includes('!');
      })
    );
  };

  setGroupInfoParents = (wholeGroupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>) => {
    for (const groupInfoSymbol in wholeGroupSymbolToInfoDict) {
      const groupInfo = wholeGroupSymbolToInfoDict[groupInfoSymbol as GroupStubSymbol];

      for (const currentGroupInfoSymbol in wholeGroupSymbolToInfoDict) {
        const currentGroupInfo = wholeGroupSymbolToInfoDict[currentGroupInfoSymbol as GroupStubSymbol];

        if (currentGroupInfo === undefined || currentGroupInfo === groupInfo || currentGroupInfo.isRoot) continue;
        if (groupInfo.content.includes(currentGroupInfo.groupSymbol)) currentGroupInfo.parent = groupInfo;
      }
    }
  };

  makeGroupTypeFromGroupContent = ({
    groupInfo,
    wholeGroupSymbolToInfoDict,
    groupStubSymbols,
    countableGroupSymbols,
  }: {
    wholeGroupSymbolToInfoDict: Record<GroupStubSymbol, GroupInfo>;
    groupStubSymbols: GroupStubSymbol[];
    countableGroupSymbols: GroupStubSymbol[];
    groupInfo: GroupInfo;
  }) => {
    if (!groupInfo.content) return '``';

    let content = groupInfo.content
      .replace(makeRegExp(`/(?<!${this.stubs.escape})(?:[$^])/g`), '')
      .replace(makeRegExp(`/${this.stubs.groupPostfixDiv}/g`), '');

    content = content.replace(
      makeRegExp(`/\\\\{2}(?:(\\d+)|k<([\\w$_]+)>)(${this.quantifierRegStr}|)/g`),
      (all, linkNumber: string | undefined, linkName: string | undefined, quantifier: string) => {
        if (!linkNumber && !linkName) return all;

        let linkTypeName: string | null = null;
        let linkGroupName = groupInfo;
        let linkTargetGroupInfo: GroupInfo | null = null;

        if (linkNumber) {
          if (`$${linkNumber}` in this.groupNameToSymbolDict) {
            const linkTargetGroupSymbol = this.groupNameToSymbolDict[`$${linkNumber}` as GroupName];
            linkTargetGroupInfo = wholeGroupSymbolToInfoDict[linkTargetGroupSymbol];

            linkGroupName = linkTargetGroupInfo;
          } else {
            const linkTargetGroupSymbol = countableGroupSymbols[+linkNumber - 1];

            if (linkTargetGroupSymbol !== undefined) {
              linkTargetGroupInfo = wholeGroupSymbolToInfoDict[linkTargetGroupSymbol];

              linkTypeName = this.makeGroupTypeName(linkTargetGroupInfo);
            } else return `\\x${linkNumber.padStart(2, '0')}`;
          }
        } else if (linkName) {
          const linkTargetGroupSymbol = this.groupNameToSymbolDict[linkName as GroupName];
          linkTargetGroupInfo = wholeGroupSymbolToInfoDict[linkTargetGroupSymbol];
          linkGroupName = linkTargetGroupInfo;
        }

        linkTypeName ??= this.makeGroupTypeName(linkGroupName);

        const isOptionalLink =
          this.checkIsOptionalQuantifier(quantifier) ||
          (linkTargetGroupInfo &&
            (linkTargetGroupInfo.isOpt ||
              linkTargetGroupInfo.isOptAsChild ||
              this.someOfGroupParents(linkTargetGroupInfo, info => info.isOpt || info.isOptChildren)));

        return `\${${linkTypeName}${isOptionalLink ? this.stubs.optional : ''}}`;
      },
    );

    for (const currentGroupSymbol of groupStubSymbols) {
      const currentGroupInfo = wholeGroupSymbolToInfoDict[currentGroupSymbol] as GroupInfo | undefined;
      if (currentGroupInfo === undefined) continue;

      content = content.replace(makeRegExp(`/${currentGroupSymbol}+/g`), () => {
        const typeText = currentGroupInfo.isCountable
          ? this.makeGroupTypeName(currentGroupInfo)
          : this.makeUncountableGroupTypeName(currentGroupInfo.name);

        const optionalSign = currentGroupInfo.isOpt ? this.stubs.optional : '';

        return `\${${typeText}${optionalSign}}`;
      });
    }

    content = content
      .replace(makeRegExp(`/${this.stubs.openParenthesis}{3}/g`), '(')
      .replace(makeRegExp(`/${this.stubs.closeParenthesis}{3}/g`), ')')
      .replace(makeRegExp(`/(?<!${this.stubs.escape})\\.+/g`), this.stubs.string);

    content = content
      .replace(makeRegExp(`/\\\\{2}(\\w)(${this.quantifierRegStr}|)/g`), (_all, char, quantifier) => {
        if (char === 'n') {
          return this.insertOptionalChar(quantifier, '`\\n`');
        }

        return this.insertOptionalChar(quantifier, 'string', this.stubs.string);
      })
      .replace(makeRegExp(`/((?:\\\\{2})?(?:\\\\[$]))(${this.quantifierRegStr})/g`), (all, char, quantifier) => {
        return this.insertOptionalChar(quantifier, `\`${char}\``, all);
      })
      .replace(
        makeRegExp(
          `/([^\\\\${this.stubs.escape}]|${this.stubs.slash}{4}|${this.stubs.disjunction}{3})(${this.quantifierRegStr})/g`,
        ),
        (_all, char, quantifier) => this.insertOptionalChar(quantifier, `\`${char}\``),
      );

    if (this.flags.u)
      content = content.replace(
        makeRegExp(`/${this.stubs.escape}{2}(?:[pP]{[\\w_]+(?:=[\\w_]+)?}|${this.stringifiableRegStrCharacter})/g`),
        this.stubs.string,
      );

    content = content
      .replace(makeRegExp(`/([${this.stubs.slash}\\\\])\\1\\1\\1/g`), '\\\\')
      .replace(makeRegExp(`/${this.stubs.slash}{2}/g`), '')
      .replace(makeRegExp(`/${this.stubs.escape}{2}[bB]/g`), '')
      .replace(makeRegExp(`/(\\\\{2,3})?${this.stubs.dollar}/g`), '$')
      .replace(makeRegExp(`/${this.stubs.escape}+/g`), '')
      .replace(makeRegExp(`/[${this.stubs.slash}${this.stubs.escape}]/g`), '\\')
      .replace(makeRegExp(`/${this.stubs.untemplated}/g`), '\\${')
      .replace(makeRegExp(`/${this.stubs.freeUntemplated}/g`), '{')
      .split('|')
      .join('` | `')
      .replace(makeRegExp(`/${this.stubs.disjunction}{3}/g`), '|')
      .replace(makeRegExp(`/${this.stubs.optional}/g`), " | ''")
      .replace(makeRegExp(`/(\\\\{2,3})?${this.stubs.dollar}/g`), '$')
      .replace(makeRegExp(`/${this.stubs.string}+/g`), '${string}');

    content = `\`${content}\``;

    content = this.replaceRecursively(content, '/`[$]{([^}`]+)}`/g', (_, $1) => $1);
    content = this.replaceRecursively(content, '/[$]{`([^}`]+)`}/g', (_, $1) => $1);

    content = content
      .replace(makeRegExp('/(?:(?<!\\\\)|(\\\\{2})+)\\\\[$](?!{)/g'), '$1$')
      .replace(makeRegExp(`/${this.stubs.optionalNumber}/g`), '${number | ``}')
      .replace(makeRegExp(`/${this.stubs.number}/g`), '${number}');

    return content;
  };

  hexCharacter = '[abcdefABCDEF\\d]';
  stringifiableRegStrCharacter = `x${this.hexCharacter}{2}|u${this.hexCharacter}{4}|u{${this.hexCharacter}{1,6}}|c.|f|v|t`;

  replaceRecursively = (text: string, strReg: StrRegExp, replacer: (...args: [string, ...any]) => string) => {
    let isFound = true;

    while (isFound) {
      isFound = false;

      text = text.replace(makeRegExp(strReg), (...args) => {
        isFound = true;
        return replacer(...args);
      });
    }

    return text;
  };

  checkIsOptionalQuantifier = (quantifier: string | undefined) => {
    const isOpt =
      !!quantifier &&
      (quantifier.startsWith('{0,') ||
        quantifier.startsWith('{,') ||
        quantifier === '?' ||
        quantifier.endsWith('*') ||
        quantifier === '{0}');

    return isOpt;
  };

  insertOptionalChar = (quantifier: string | undefined, char: string, orRequired?: string, inTextInserted = true) => {
    if (quantifier === '{0}') return '';

    const text = inTextInserted ? `\${${char}}` : char;

    if (!quantifier || quantifier === '{1}') return orRequired ?? text;

    if (quantifier === '{2}') return orRequired ?? text.repeat(2);
    if (quantifier === '{3}') return orRequired ?? text.repeat(3);

    if (quantifier.startsWith('+')) return inTextInserted ? `\${RepeatingString<${char}>}` : `RepeatingString<${char}>`;
    if (quantifier.endsWith('?'))
      return inTextInserted ? `\${${char}${this.stubs.optional}}` : `${char}${this.stubs.optional}`;

    if (quantifier.endsWith('*') || quantifier.startsWith('{0,') || quantifier.startsWith('{,')) {
      return inTextInserted ? `\${OptRepeatingString<${char}>}` : `OptRepeatingString<${char}>`;
    }

    return orRequired ?? `${text}${this.stubs.string}`;
  };

  checkIsGroupOptional = (groupStr: string) =>
    this.checkIsOptionalQuantifier(groupStr.slice(groupStr.lastIndexOf(')')));

  cutFileComments = (content: string) =>
    content
      .replace(makeRegExp('//{2,} *regexpert:\\s*(/{2,} *(?:stringify).+)/g'), (_all, toolsStr: string) => {
        return toolsStr
          .split(makeRegExp('/(^|\\r?\\n)\\s*/*\\s*/'))
          .map(line => `${this.toolsCommentSlashStub}${line}`.trim())
          .filter(line => line !== this.toolsCommentSlashStub)
          .join('\n');
      })
      .replace(makeRegExp('/(?:^|\\n) */{2,}.*/g'), '');

  replaceStringTemplateInserts = (regStr: string) => {
    return regStr.replace(makeRegExp(`/(?<!${this.stubs.escape})(?:[$]\\{[^{}[\\]]+?\\})/g`), this.stubs.string);
  };

  someOfGroupParents = (groupInfo: GroupInfo, someCb: (groupInfo: GroupInfo) => boolean) => {
    const checkedSet = new Set();
    let groupToCheck = groupInfo.parent;

    while (groupToCheck !== null) {
      if (checkedSet.has(groupToCheck)) return false;
      checkedSet.add(groupToCheck);

      if (someCb(groupToCheck)) return true;
      groupToCheck = groupToCheck.parent;
    }

    return false;
  };

  replaceFileConstants = (regStr: string) => {
    const foundConstants: Record<string, string> = {};
    const foundDisabledConstants: Record<string, string> = {};
    const reg = makeRegExp(
      `/((?<!\\\\)(?:(?:\\\\{2})*|))[$]{\\s*(${nameDisablerFuncName}[(]\\s*([\\w$_]+)(?:(?:,"(_[\\w_$]*)")|,)?\\s*[)]|[\\w$_]+|\\d+)\\s*}/g`,
    );

    const replaceConstants = (text: string, i: number): string => {
      return text.replace(
        reg,
        (_all, before, constantName, constantDisabledName: string | undefined, groupNamePostfix = '') => {
          const isNameEscaped = !!constantDisabledName;
          const constantsStore = isNameEscaped ? foundDisabledConstants : foundConstants;
          const storeKey = `${constantName}`;

          if (isNameEscaped) constantName = constantDisabledName;

          if (constantsStore[storeKey] !== undefined)
            return replaceConstants(`${before}${constantsStore[storeKey]}`, i + 1);

          if (makeRegExp('/^\\d+$/').test(constantName)) return `${before}${this.stubs.string}`;

          const matches = Array.from(
            this.content.matchAll(makeRegExp(`/const ${constantName}\\s*=\\s*${this.stringQuotedContentRegStr}/g`)),
          );

          if (matches.length !== 1) return `${before}${this.stubs.string}`;

          constantsStore[storeKey] = matches[0][1].replace(makeRegExp(`/\\\\+$/`), all =>
            this.stubs.slash.repeat(all.length),
          );

          constantsStore[storeKey] = replaceConstants(constantsStore[storeKey], i + 1);

          if (isNameEscaped)
            constantsStore[storeKey] = this.escapeRegExpNames(constantsStore[storeKey], groupNamePostfix);

          return `${before}${constantsStore[storeKey]}`;
        },
      );
    };

    return replaceConstants(regStr, 0);
  };

  replaceEscapeds = (regStr: string) => {
    regStr = regStr.replace(
      makeRegExp(`/(\\\\+?)(${this.stringifiableRegStrCharacter}|[bBpP0])/g`),
      (all, slashes: string, text: string) => {
        return checkIs4xSlashes(slashes)
          ? all
          : this.repeatWithoutNegatives('\\', slashes.length - 2) + this.stubs.escape.repeat(2) + text;
      },
    );

    regStr = regStr.replace(makeRegExp('/(\\\\+?)[|]/g'), (all, slashes: string) => {
      return checkIs4xSlashes(slashes)
        ? all
        : `${this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 2)}${this.stubs.disjunction.repeat(3)}`;
    });

    regStr = regStr.replace(makeRegExp(`/(\\\\*?)[$]\\\\{/g`), (all, slashes: string) => {
      if (checkIs2xSlashes(slashes) || !slashes) return `${slashes}\\$\{`;
      if (checkIs2xSlashes(slashes.slice(0, -1))) return `${slashes}$\{`;

      return all;
    });

    regStr = regStr.replace(makeRegExp(`/(\\\\*?)[$]({\\d+})/g`), (all, slashes: string, quantifier: string) => {
      if (checkIs4xSlashes(slashes)) return all;
      return this.repeatWithoutNegatives(this.stubs.slash, slashes.length) + this.stubs.dollar + quantifier;
    });

    regStr = regStr.replace(makeRegExp(`/(\\\\+?)[$]{/g`), (all, slashes: string) => {
      if (!slashes || slashes.length === 1 || checkIs4xSlashes(slashes) || checkIs4xSlashes(slashes.slice(0, -1))) {
        return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 1) + this.stubs.freeUntemplated;
      }

      if (checkIs2xSlashes(slashes.slice(0, -1))) {
        return (
          this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 3) +
          this.repeatWithoutNegatives(this.stubs.escape, 2) +
          this.stubs.untemplated
        );
      }

      return all;
    });

    regStr = regStr.replace(makeRegExp(`/(\\\\+?)([-[\\]|?^$+*{}:().])/g`), (_all, slashes: string, chars: string) => {
      if (slashes.length === 5) return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 5) + chars;
      if (slashes.length === 1) return chars;

      if (checkIs4xSlashes(slashes)) return this.stubs.slash.repeat(slashes.length) + chars;

      if (checkIs4xSlashes(slashes.slice(1)))
        return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 1) + chars;

      if (checkIs2xSlashes(slashes)) {
        return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 2) + this.stubs.escape.repeat(2) + chars;
      }

      if (checkIs2xSlashes(slashes.slice(1)))
        return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 3) + this.stubs.escape.repeat(2) + chars;

      return this.stubs.escape.repeat(slashes.length) + chars;
    });

    regStr = regStr
      .replace(makeRegExp(`/(\\\\+?)(\\w)/g`), (all, slashes: string, chars: string) => {
        if (checkIs4xSlashes(slashes)) {
          return this.stubs.slash.repeat(slashes.length) + chars;
        }

        if (checkIs2xSlashes(slashes)) {
          return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 2) + '\\\\' + chars;
        }

        if (!checkIs2xSlashes(slashes)) {
          return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 3) + '\\\\' + chars;
        }

        return all;
      })
      .replace(makeRegExp('/(\\\\+?)([^\\\\`])/g'), (all, slashes: string, chars: string) => {
        if (slashes.length < 3) return all;

        if (chars === '<') {
          return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 2) + '\\\\' + chars;
        }

        if (checkIs2xSlashes(slashes)) {
          return this.stubs.slash.repeat(slashes.length) + chars;
        }

        return this.repeatWithoutNegatives(this.stubs.slash, slashes.length - 1) + chars;
      });

    regStr = regStr.replace(
      /(\\+?)\(|(\\+?)\)/g,
      (all, openSlashes: string | undefined, closeSlashes: string | undefined) => {
        if (openSlashes !== undefined) {
          return checkIs4xSlashes(openSlashes) ? `${openSlashes.slice(2)}${this.stubs.openParenthesis.repeat(3)}` : all;
        }

        if (closeSlashes !== undefined) {
          return checkIs4xSlashes(closeSlashes)
            ? `${closeSlashes.slice(2)}${this.stubs.closeParenthesis.repeat(3)}`
            : all;
        }

        return all;
      },
    );

    return regStr;
  };

  repeatWithoutNegatives = (text: string, repeatCount: number) => text.repeat(repeatCount < 0 ? 0 : repeatCount);

  insertGroupsWithReplace = ({
    groups,
    regStr,
    groupSymbolsDict,
    groupStubSymbols,
    symbolGroupsDict,
    countableGroupSymbolsDict,
  }: {
    regStr: string;
    groups: Record<number, string>;
    groupStubSymbols: GroupStubSymbol[];
    groupSymbolsDict: Record<number, GroupStubSymbol>;
    countableGroupSymbolsDict: Record<number, GroupStubSymbol>;
    symbolGroupsDict: Record<GroupStubSymbol, number>;
  }) => {
    let otherStubSymboli = 0;

    return this.replaceRecursively(
      regStr,
      `/(?<!${this.stubs.escape})\\((\\?(?:!|<!|.))?(?:${this.stubs.escape}[()]|[^()])*?\\)(?:${this.quantifierRegStr}|)/g`,

      (all, groupKey: string | undefined, index) => {
        groups[index] = all;
        groupSymbolsDict[index] = groupStubSymbols[otherStubSymboli++] as GroupStubSymbol;
        symbolGroupsDict[groupSymbolsDict[index]] = index;

        if (groupKey === undefined || groupKey === '?<') {
          countableGroupSymbolsDict[index] = groupSymbolsDict[index];
        }

        return groupSymbolsDict[index].repeat(all.length);
      },
    );
  };
}
