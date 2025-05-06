import { PluginOptions, StrRegExpFlag } from '../types/model';
import { makeRegExp } from './makeRegExp';
import { testMaker } from './test.maker';
import { GroupInfo, GroupName, GroupStubSymbol, StubSymbol } from './types';
import { checkIs2xSlashes, checkIs4xSlashes } from './utils';

setTimeout(testMaker, 500);

export class TransformProcess {
  makerInvokesContentSplitterRegExp: RegExp;
  content: string;
  fileMD5: string;

  quantifierRegStr = '[?+*]\\??|{,\\d+}|{\\d+,\\d*?}|{\\d+}' as const;
  sortGroupIndexes = (a: number, b: number) => a - b;

  stringStubSymbol = StubSymbol.def;
  numberStubSymbol = StubSymbol.def;
  optionalNumberStubSymbol = StubSymbol.def;
  emptyStubSymbol = StubSymbol.def;
  unionStubSymbol = StubSymbol.def;
  optionalStubSymbol = StubSymbol.def;
  untemplatedStubSymbol = StubSymbol.def;
  slashStubSymbol = StubSymbol.def;
  escapeStubSymbol = StubSymbol.def;
  openParenthesisStubSymbol = StubSymbol.def;
  closeParenthesisStubSymbol = StubSymbol.def;

  flags = {} as Record<StrRegExpFlag, boolean>;
  groupNameToSymbolDict = {} as Record<GroupName, GroupStubSymbol>;

  constructor(
    private pluginOptions: PluginOptions = {
      collectClassCharactersMaxCount: 9,
    },
    options: { importNameMatch: RegExpMatchArray; content: string; fileMD5: string },
  ) {
    this.fileMD5 = options.fileMD5;
    this.content = options.content;

    this.makerInvokesContentSplitterRegExp = makeRegExp(
      `/${
        options.importNameMatch[1] ?? 'makeNamedRegExp'
      }\\(\\s*(?:\\s*(?:\\/{2,}.*|\\/\\*[\\w\\W]+?\\*\\/)\\s*\n*)*/gm`,
    );
  }

  stubCharCode = 999;
  makeStub = (regStr: string) => {
    do this.stubCharCode++;
    while (regStr.includes(String.fromCharCode(this.stubCharCode)));
    return String.fromCharCode(this.stubCharCode) as StubSymbol;
  };

  setStubSymbols = (regStr: string) => {
    this.stubCharCode = 999;

    this.stringStubSymbol = this.makeStub(regStr);
    this.optionalNumberStubSymbol = this.makeStub(regStr);
    this.numberStubSymbol = this.makeStub(regStr);
    this.emptyStubSymbol = this.makeStub(regStr);
    this.slashStubSymbol = this.makeStub(regStr);
    this.escapeStubSymbol = this.makeStub(regStr);
    this.openParenthesisStubSymbol = this.makeStub(regStr);
    this.closeParenthesisStubSymbol = this.makeStub(regStr);
    this.unionStubSymbol = this.makeStub(regStr);
    this.optionalStubSymbol = this.makeStub(regStr);
    this.untemplatedStubSymbol = this.makeStub(regStr);
  };

  setGroupStubSymbols = (regStr: string) => {
    const groupStubSymbols: GroupStubSymbol[] = [];

    regStr.replace(/\(/g, (all, slashes) => {
      if (checkIs4xSlashes(slashes)) return all;
      groupStubSymbols.push(this.makeStub(regStr) as never);
      return all;
    });

    return groupStubSymbols;
  };

  process = () => {
    this.content = this.cutFileComments(this.content);

    const splits = this.content.split(this.makerInvokesContentSplitterRegExp);
    const namespaces: string[] = [];
    const registeredTypeKeysSet = new Set<string>();

    for (let userRegStri = 1; userRegStri < splits.length; userRegStri++) {
      const leadRegQuote = splits[userRegStri][0];

      const findFreeBracketReg = makeRegExp(`/(?<!\\\\)(?:\\\\{2})*\\\`/`);
      const findConcatenatesReg = makeRegExp('/(?<!(?:\\\\{2})*\\\\)`/');
      const index = splits[userRegStri].slice(1).search(findFreeBracketReg);
      const userWritedRegStr = splits[userRegStri]?.slice(1, index + 1);

      const match = userWritedRegStr.match(findConcatenatesReg);

      if (match) {
        console.info(userWritedRegStr);
        throw `StringRegExp can not be concatenated template string`;
      }

      if (leadRegQuote !== '`') {
        console.info(userWritedRegStr);
        throw `StringRegExp must be template string - makeNamesRegExp(\`/ /g\`)`;
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
          .replace(
            makeRegExp(`/\\[([^${this.stringStubSymbol}]+?)\\](${this.quantifierRegStr}|)/g`),
            this.stringStubSymbol,
          )
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
          },
        };

        for (const groupIndex of groupIndexes) {
          const groupStr = groups[groupIndex];
          const groupNameMatch = groupStr.match(makeRegExp('/\\((\\?(?:<[!=]|<([^>]*?)>|))?/'));

          if (groupNameMatch === null) throw '#Incorrect RegExp group';
          const matchedGroupName = groupNameMatch[2] as GroupName | undefined;
          const isNoname = matchedGroupName === undefined;

          if (!isNoname) {
            if (matchedGroupName === GroupName.empty) throw '#Group name can not be empty - <>';
            if (matchedGroupName.match(makeRegExp('/^\\d|[^$_\\w]/')))
              throw `#Incorrect group name - <${matchedGroupName}>`;
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
            };

            continue;
          }

          const groupContent = groupStr.slice(isNoname ? 1 : matchedGroupName.length + 4, groupStr.lastIndexOf(')'));
          const isOptChildren = isEachGroupIsOptional || groupContent.includes('|');

          countableGroupi++;
          const groupName = matchedGroupName ?? (`$${countableGroupi}` as GroupName);
          this.groupNameToSymbolDict[groupName] = groupSymbol;

          groupSymbolToInfoDict[groupSymbol] = {
            isRoot: false,
            isOpt: false,
            isOptChildren,
            isOptAsChild,
            groupStr,
            groupSymbol,
            name: groupName,
            isNumName: matchedGroupName == null,
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
          if (groupTypeContentsDict[groupInfo.name] !== undefined) throw `#Inclusive group name - <${groupInfo.name}>`;
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

        Object.values(wholeGroupSymbolToInfoDict).forEach(groupInfo => {
          if (groupInfo.isCountable) {
            const typeName = this.makeGroupTypeName(groupInfo);

            recordFieldsTypes.push(
              `${groupInfo.name}${
                groupInfo.isOpt || groupInfo.isOptAsChild || groupInfo.isNever ? '?' : ''
              }: ${typeName}`,
            );
            const typeContent = groupTypeContentsDict[groupInfo.name];
            const sameContentGroupName = this.makeGroupTypeName(groupTypeContentsToNameDict[groupInfo.content]);

            groupTypeParts.push(
              `type ${typeName} = ${
                sameContentGroupName &&
                sameContentGroupName !== typeName &&
                sameContentGroupName.length < typeContent.length
                  ? sameContentGroupName
                  : typeContent
              };`,
            );
          } else {
            uncountableGroupPartTypes.push(
              `type ${this.makeUncountableGroupTypeName(groupInfo.name)} = ${
                //
                groupInfo.key !== ':' ? "''; // " : ''
              }${groupInfo.isNever ? 'undefined & ' : ''}${
                //
                groupTypeContentsDict[groupInfo.name]
              };`,
            );
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
        if (!`${error}`.startsWith('#')) throw error;

        namespaces.push(
          `namespace ${this.makeNamespaceTypeName(
            '',
            namespaces.length,
          )} {\n  export interface I extends Record<\n    ${typeKey},\n    \`${`${error}`
            .slice(1)
            .replace(makeRegExp('/`/g'), '\\`')}\`> { '': '' }\n}`,
        );
      }
    }

    if (!namespaces.length) return null;

    return {
      types: `/* eslint-disable @typescript-eslint/no-namespace */\n\n${
        '' + namespaces.join('\n\n')
      }\n\ninterface _GlobalScopedNamedRegExpMakerGeneratedTypes\n  extends ${
        '' + namespaces.map(this.makeNamespaceDotITypeName).join(',\n    ')
      } {\n    '': ''\n}`,
    };
  };

  makeGroupTypeName = (groupInfo?: GroupInfo) => {
    if (!groupInfo) return '';

    return groupInfo.isNumName ||
      (groupInfo.name.startsWith('$') && !(groupInfo.name.slice(1) in this.groupNameToSymbolDict))
      ? groupInfo.name
      : `$${groupInfo.name}`;
  };
  makeUncountableGroupTypeName = (groupName: GroupName) => `U${groupName}`;

  makeNamespaceTypeName = (_text: string, index: number) => `N${this.fileMD5}_${index + 1}`;
  makeNamespaceDotITypeName = (text: string, index: number) => `${this.makeNamespaceTypeName(text, index)}.I`;

  checkIsHasSubTypes = (regStr: string, groupSymbols: GroupStubSymbol[]) => {
    return groupSymbols.some(char => regStr.includes(char));
  };

  makeRegTypeKey = (regStr: string, regFlags: string) => {
    return `\`/${
      regStr
        .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '\\\\|')
        .replace(makeRegExp(`/${this.escapeStubSymbol}{2}([bB])/g`), '\\\\$1')
        .replace(makeRegExp(`/[${this.slashStubSymbol}${this.escapeStubSymbol}]/g`), '\\')
        .replace(makeRegExp(`/${this.untemplatedStubSymbol}/g`), '\\${')
        .replace(makeRegExp(`/${this.stringStubSymbol}/g`), '${string}')
        .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '\\\\(')
        .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), '\\\\)')
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
        `/(?<!${this.escapeStubSymbol})\\[(?:${this.escapeStubSymbol}{2}]|.)*?\\$\\\\?{(?:${this.escapeStubSymbol}{2}]|.)*?(?<!${this.escapeStubSymbol})]/g`,
      ),
      this.stringStubSymbol,
    );
  };

  replaceEnums = (regStr: string) => {
    regStr = regStr.replace(
      makeRegExp(
        `/((?:(\\\\*)\\[(?:\\d[-\\d]*\\d)?]|(\\\\+)d)(${this.quantifierRegStr}|))|(?<!${this.escapeStubSymbol})\\[(?:${this.escapeStubSymbol}{2}]|.)+?(?<!${this.escapeStubSymbol})]/g`,
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
            ? this.optionalNumberStubSymbol
            : this.numberStubSymbol;

          if (numberSlashes !== undefined) {
            return checkIs2xSlashes(numberSlashes) ? returnNumber : all;
          }

          return checkIs4xSlashes(enumSlashes) ? all : returnNumber;
        }

        return this.stringStubSymbol;
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

    let content = groupInfo.content.replace(makeRegExp(`/(?<!${this.escapeStubSymbol})(?:[$^])/g`), '');

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

        return `\${${linkTypeName}${isOptionalLink ? this.optionalStubSymbol : ''}}`;
      },
    );

    for (const currentGroupSymbol of groupStubSymbols) {
      const currentGroupInfo = wholeGroupSymbolToInfoDict[currentGroupSymbol] as GroupInfo | undefined;
      if (currentGroupInfo === undefined) continue;

      content = content.replace(makeRegExp(`/${currentGroupSymbol}+/g`), () => {
        const typeText = currentGroupInfo.isCountable
          ? this.makeGroupTypeName(currentGroupInfo)
          : this.makeUncountableGroupTypeName(currentGroupInfo.name);

        const optionalSign = currentGroupInfo.isOpt ? this.optionalStubSymbol : '';

        return `\${${typeText}${optionalSign}}`;
      });
    }

    content = content
      .replace(makeRegExp(`/${this.openParenthesisStubSymbol}{3}/g`), '(')
      .replace(makeRegExp(`/${this.closeParenthesisStubSymbol}{3}/g`), ')')
      .replace(makeRegExp(`/(?<!${this.escapeStubSymbol})\\.+/g`), this.stringStubSymbol)
      .replace(makeRegExp(`/\\\\{2}(\\w)(${this.quantifierRegStr}|)/g`), (_all, char, quantifier) => {
        if (char === 'n') {
          return this.insertOptionalChar(quantifier, '`\\n`');
        }

        return this.insertOptionalChar(quantifier, 'string', this.stringStubSymbol);
      })
      .replace(makeRegExp(`/${this.slashStubSymbol}/g`), '\\')
      .replace(makeRegExp(`/${this.escapeStubSymbol}{2}([bB])/g`), '')
      .replace(makeRegExp(`/${this.escapeStubSymbol}+/g`), '')
      .replace(makeRegExp(`/((?:\\\\\\\\)?[^\\\`])(${this.quantifierRegStr})/g`), (all, char, quantifier) =>
        this.insertOptionalChar(quantifier, `\`${char}\``, all),
      )
      .replace(makeRegExp(`/([^\\\\])(${this.quantifierRegStr})/g`), (_all, char, quantifier) =>
        this.insertOptionalChar(quantifier, `\`${char}\``),
      )
      .replace(makeRegExp(`/[${this.slashStubSymbol}${this.escapeStubSymbol}]/g`), '\\')
      .replace(makeRegExp(`/${this.untemplatedStubSymbol}/g`), '\\${')
      .split('|')
      .join('` | `')
      .replace(makeRegExp(`/${this.unionStubSymbol}{3}/g`), '|')
      .replace(makeRegExp(`/${this.optionalStubSymbol}/g`), " | ''")
      .replace(makeRegExp(`/${this.escapeStubSymbol}{2}[bB]/g`), '')
      .replace(makeRegExp(`/${this.stringStubSymbol}+/g`), '${string}');

    content = `\`${content}\``
      .replace(makeRegExp('/\\`\\${([^}`]+)}\\`/g'), '$1')
      .replace(makeRegExp('/\\${`([^}`]+)`}/g'), '$1')
      .replace(makeRegExp(`/${this.optionalNumberStubSymbol}/g`), `\${number | ''}`)
      .replace(makeRegExp(`/${this.numberStubSymbol}/g`), `\${number}`);

    return content;
  };

  checkIsOptionalQuantifier = (quantifier: string | undefined) => {
    return (
      quantifier !== undefined &&
      ((quantifier.endsWith('?') && !quantifier.startsWith('+')) ||
        quantifier.endsWith('*') ||
        quantifier.startsWith('{0,') ||
        quantifier.startsWith('{,') ||
        quantifier === '{0}')
    );
  };

  insertOptionalChar = (quantifier: string | undefined, char: string, orRequired?: string) => {
    if (!quantifier || quantifier === '{1}') {
      return orRequired ?? `\${${char}}`;
    }

    if (quantifier.startsWith('+')) return `\${${char}}\${string}`;
    if (quantifier.endsWith('?')) return `\${${char}${this.optionalStubSymbol}}`;
    if (quantifier.endsWith('*') || quantifier.startsWith('{0,') || quantifier.startsWith('{,')) {
      return `\${''${this.unionStubSymbol.repeat(3)}\`\${${char}}${this.stringStubSymbol}\`}`;
    }

    if (quantifier === '{0}') return '';

    return orRequired ?? `\${${char}}${this.stringStubSymbol}`;
  };

  checkIsGroupOptional = (groupStr: string) => !!groupStr.match(makeRegExp('/(?:[*?]|{(?:|0),\\d*})\\??$/'));

  cutFileComments = (content: string) => content.replace(/(?:^|\n) *\/{2,}.*/g, '');

  replaceStringTemplateInserts = (regStr: string) => {
    return regStr.replace(
      makeRegExp(`/(?<!${this.escapeStubSymbol})(?:\\$\\{[^{}[\\]]+?\\})/g`),
      this.stringStubSymbol,
    );
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
    let isConstantsFound = true;
    const foundConstants: Record<string, string> = {};

    while (isConstantsFound) {
      isConstantsFound = false;

      regStr = regStr.replace(makeRegExp(`/(?=(?<!\\\\)(?=(?:\\\\{4})*|))\\\${([\\w$_]+)}/g`), (_all, constantName) => {
        if (foundConstants[constantName] !== undefined) return foundConstants[constantName];
        isConstantsFound = true;

        const matches = Array.from(this.content.matchAll(makeRegExp(`/const ${constantName}\\s*=\\s*\`([^\`]*)\`/g`)));

        if (matches.length > 1 || matches.length < 1) return this.stringStubSymbol;

        return (foundConstants[constantName] = matches[0][1]);
      });
    }

    return regStr;
  };

  replaceEscapeds = (regStr: string) => {
    regStr = regStr.replace(makeRegExp('/(\\\\+?)([bB])/g'), (all, slashes: string, text: string) => {
      return checkIs4xSlashes(slashes)
        ? all
        : this.repeatWithoutNegatives('\\', slashes.length - 2) + this.escapeStubSymbol.repeat(2) + text;
    });

    regStr = regStr.replace(makeRegExp('/(\\\\+?)[|]/g'), (all, slashes: string) => {
      return checkIs4xSlashes(slashes)
        ? all
        : `${this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 2)}${this.unionStubSymbol.repeat(3)}`;
    });

    regStr = regStr
      .replace(makeRegExp(`/(\\\\+?)(\\$\\\\?{|[-[\\]|?^$+*{}:().])/g`), (_all, slashes: string, chars: string) => {
        if (chars === '${' || chars === '$\\{') {
          if (checkIs2xSlashes(slashes)) {
            if (chars === '${') return this.slashStubSymbol.repeat(slashes.length) + chars;
            return this.slashStubSymbol.repeat(slashes.length) + this.untemplatedStubSymbol;
          } else {
            return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 1) + this.untemplatedStubSymbol;
          }
        }

        if (checkIs4xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        if (!checkIs2xSlashes(slashes)) {
          return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 1) + chars;
        }

        return this.escapeStubSymbol.repeat(slashes.length) + chars;
      })
      .replace(makeRegExp(`/(\\\\+?)(\\w)/g`), (all, slashes: string, chars: string) => {
        if (checkIs4xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        if (checkIs2xSlashes(slashes)) {
          return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 2) + '\\\\' + chars;
        }

        if (!checkIs2xSlashes(slashes)) {
          return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 3) + '\\\\' + chars;
        }

        return all;
      })
      .replace(makeRegExp('/(\\\\+?)([^\\\\`])/g'), (all, slashes: string, chars: string) => {
        if (slashes.length < 3) return all;

        if (chars === '<') {
          return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 2) + '\\\\' + chars;
        }

        if (checkIs2xSlashes(slashes)) {
          return this.slashStubSymbol.repeat(slashes.length) + chars;
        }

        return this.repeatWithoutNegatives(this.slashStubSymbol, slashes.length - 1) + chars;
      });

    regStr = regStr.replace(
      /(\\+?)\(|(\\+?)\)/g,
      (all, openSlashes: string | undefined, closeSlashes: string | undefined) => {
        if (openSlashes !== undefined) {
          return checkIs4xSlashes(openSlashes)
            ? `${openSlashes.slice(2)}${this.openParenthesisStubSymbol.repeat(3)}`
            : all;
        }

        if (closeSlashes !== undefined) {
          return checkIs4xSlashes(closeSlashes)
            ? `${closeSlashes.slice(2)}${this.closeParenthesisStubSymbol.repeat(3)}`
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
    let isNeedReplace = true;
    let otherStubSymboli = 0;

    while (isNeedReplace) {
      isNeedReplace = false;

      regStr = regStr.replace(
        makeRegExp(
          `/(?<!${this.escapeStubSymbol})\\((\\?(?:!|<!|.))?(?:${this.escapeStubSymbol}[()]|[^()])*?\\)(?:${this.quantifierRegStr}|)/g`,
        ),
        (all, groupKey: string | undefined, index) => {
          isNeedReplace = true;

          groups[index] = all;
          groupSymbolsDict[index] = groupStubSymbols[otherStubSymboli++] as GroupStubSymbol;
          symbolGroupsDict[groupSymbolsDict[index]] = index;

          if (groupKey === undefined || groupKey === '?<') {
            countableGroupSymbolsDict[index] = groupSymbolsDict[index];
          }

          return groupSymbolsDict[index].repeat(all.length);
        },
      );
    }

    return regStr;
  };
}
