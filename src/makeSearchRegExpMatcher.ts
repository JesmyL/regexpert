import { makeSearchRegExpMatcher as matcher } from '../types/model';
import { escapeRegExpSymbols } from './escapeRegExpSymbols';
import { flags } from './utils';

const startRegIndicatorReg = /^[a-z]*\//;
const flagsSet = new Set(Object.keys(flags));
const stringSplitter = / +/;

export const makeSearchRegExpMatcher: typeof matcher = (term, splitPartsReg = stringSplitter) => {
  const errors: ReturnType<typeof matcher>['errors'] = {};
  const startRegExpIndicator = term.match(startRegIndicatorReg);

  try {
    const regExp = startRegExpIndicator
      ? new RegExp(`${term.slice(startRegExpIndicator[0].length)}`, `${startRegExpIndicator[0].slice(0, -1)}`)
      : new RegExp(`${escapeRegExpSymbols(term).trim().split(splitPartsReg).join('|')}`, 'gi');

    return { regExp, errors };
  } catch (regExpError) {
    errors.isError = true;

    const unknownUserFlags = startRegExpIndicator?.[0]
      .slice(0, -1)
      .split('')
      ?.filter(flag => !flagsSet.has(flag));

    if (unknownUserFlags?.length) errors.unknownFlags = unknownUserFlags.join('');
    else errors.regExpError = regExpError;

    return { errors, regExp: splitPartsReg };
  }
};
