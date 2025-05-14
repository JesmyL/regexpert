import { escapeRegExpNames as escaper } from '../types/model';
import { makeRegExp } from './makeRegExp';
import { checkIs2xSlashes } from './utils';

export const escapeRegExpNamesMaker =
  (
    slashChecker: typeof checkIs2xSlashes,
    singleSlashLength: number,
    replacer: (groupName: string, namePostfix: `_${string}` | undefined) => `(${string}` = (groupName, namePostfix) =>
      namePostfix ? `(?<${groupName}${namePostfix}>` : '(',
  ): typeof escaper =>
  (regStrPart, namePostfix = '' as '_') => {
    return regStrPart.replace(makeRegExp('/(\\\\*)[(][?]<([\\w_$]+)>/g'), (all, slashes, groupName: string) => {
      if (!slashes || slashChecker(slashes)) return `${slashes}${replacer(groupName, namePostfix)}`;
      if (slashes.length - singleSlashLength < 1 || slashChecker(slashes.slice(singleSlashLength))) return all;

      return `${slashes}${replacer(groupName, namePostfix)}`;
    }) as typeof regStrPart;
  };
