const symbolsReg = /([{}[\]?./\\*$^()+|])/g;
export const escapeRegExpSymbols = (str: string) => str.replace(symbolsReg, '\\$1');
