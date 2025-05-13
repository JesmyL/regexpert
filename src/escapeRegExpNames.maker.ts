import { escapeRegExpNames as escaper } from '../types/model';
import { makeRegExp } from './makeRegExp';
import { checkIs2xSlashes } from './utils';

export const escapeRegExpNamesMaker =
  (
    slashChecker: typeof checkIs2xSlashes,
    singleSlashLength: number,
    replacer: (groupName: string) => `(${string}` = () => '(',
  ): typeof escaper =>
  regStrPart => {
    return regStrPart.replace(makeRegExp('/(\\\\*)[(][?]<([\\w_$]+)>/g'), (all, slashes, groupName: string) => {
      if (!slashes || slashChecker(slashes)) return `${slashes}${replacer(groupName)}`;
      if (slashes.length - singleSlashLength < 1 || slashChecker(slashes.slice(singleSlashLength))) return all;

      return `${slashes}${replacer(groupName)}`;
    }) as typeof regStrPart;
  };
