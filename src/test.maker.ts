/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-constant-condition */
import { escapeRegExpNames } from './escapeRegExpNames';
import { makeNamedRegExp } from './makeNamedRegExp';

const printMatch = (
  { regExp, transform }: { transform(match: RegExpMatchArray | [string, ...string[]]): any; regExp: RegExp },
  text: string,
) => {
  const match = text.match(regExp);
  console.info({ text, regExp, matchDict: match && transform(match), match });
};

export const testMaker = () => {
  if (1) return;

  const arg = [''] as [''];
  console.info(`
        //////////////////////////////////////////////////////
        //////////////////// TEST START //////////////////////
        //////////////////////////////////////////////////////
 `);

  if (0) {
    const regs = makeNamedRegExp(
      // X    1 X        2         3   4    X      5
      `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888)(?: ){}(\\2)(\\k<a>?)/`,
    );

    printMatch(regs, ' |888 {}  ');
    printMatch(regs, ' |888 {} ');
    printMatch(regs, ' |888 {}');
  }

  if (0) {
    const regs = makeNamedRegExp(`/(?:a|(b))\\1c/`);

    console.info(regs.transform(arg).$0);

    // OK
    printMatch(regs, 'ac'); // ac
    printMatch(regs, 'aac'); // ac
    printMatch(regs, 'bac'); // ac
    printMatch(regs, 'bbc'); // bbc

    // NULL
    printMatch(regs, 'a\x01c');
    printMatch(regs, 'abc');
  }

  if (1) {
    const regs = makeNamedRegExp(`/(1)\\s?text between\\s(?<groupName>named group)( )?\\k<groupName>?/`);

    printMatch(regs, '1text between named group ');
  }

  if (1) {
    const groups = `1(?<Gr>2|b)(\\d)`;
    const regs = makeNamedRegExp(
      `/${groups}\\+\\+\\+${escapeRegExpNames(groups, '_GRO')}${escapeRegExpNames(groups)}/i`,
    );

    printMatch(regs, '123+++1B01b5');
  }
  console.info(
    escapeRegExpNames('/one(?<group>two)(?<$3_group>3rd\\(?<not_group1>NG\\\\(?<_group1>GG)(\\?<not_group>Ng))/'),
  );

  console.info(`
    //////////////////////////////////////////////////////
    ///////////////////// TEST END ///////////////////////
    //////////////////////////////////////////////////////
`);
};
