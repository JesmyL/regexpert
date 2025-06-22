const escapes: Record<string, string> = {};
const symbolsReg = /([{}[\]?./\\*$^()+|])/g;

export const escapeRegExpSymbols = (str: string) => {
  if (escapes[str] !== undefined) return escapes[str];
  return (escapes[str] = str.replace(symbolsReg, '\\$1'));
};
