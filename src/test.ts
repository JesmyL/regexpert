/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { escapeRegExpNames, makeNamedRegExp } from '../types/model';

const getValue = <Value extends object>(_: Value) => {};
const getKeys = <ReqKeys extends string, OptKeys extends string = string>(
  _: Record<ReqKeys, unknown> & Partial<Record<OptKeys, unknown>>,
) => {};

const arg: [``] = [``];

getValue<{ str: string }>(makeNamedRegExp(`/(?<str>\\w+)/`).transform(arg));
getValue<{ str: string }>(makeNamedRegExp(`/(?<str>\\w?)/`).transform(arg));
getValue<{ str: string }>(makeNamedRegExp(`/(?<str>a?)/`).transform(arg));
getValue<{ str: string }>(makeNamedRegExp(`/(?<str>\\w+)()(?<$stri> )(?<$str>   (?<$$str>))/`).transform(arg));

getValue<{ val: `text` }>(makeNamedRegExp(`/(?<val>text)/`).transform(arg));
getValue<{ val: `text ${number}${string}` }>(makeNamedRegExp(`/(?<val>text \\d+)/`).transform(arg));
getValue<{ val: `text ${number | ``}${string}` }>(makeNamedRegExp(`/(?<val>text \\d*)/`).transform(arg));
getValue<{ val: `text ${number | ``}${string}` }>(makeNamedRegExp(`/(?<val>text \\d?)/`).transform(arg));
getValue<{ val: `text${string}` }>(makeNamedRegExp(`/(?<val>text{1,3})/`).transform(arg));
getValue<{ val: `tex${string}` }>(makeNamedRegExp(`/(?<val>text{0,3})/`).transform(arg));
getValue<{ val: `tex${string}` }>(makeNamedRegExp(`/(?<val>text{0,})/`).transform(arg));
getValue<{ val: `tex${string}` }>(makeNamedRegExp(`/(?<val>text{,3})/`).transform(arg));

getValue<{ num: `${number}` }>(makeNamedRegExp(`/(?<num>\\d)/`).transform(arg));
getValue<{ num: `${number}` }>(makeNamedRegExp(`/(?<num>\\d{1,3})/`).transform(arg));
getValue<{ num: `${number}` | `` }>(makeNamedRegExp(`/(?<num>\\d{,3})/`).transform(arg));
getValue<{ num: `${number}` | `` }>(makeNamedRegExp(`/(?<num>\\d{0,3})/`).transform(arg));
getValue<{ num: `${number}` | `` }>(makeNamedRegExp(`/(?<num>\\d{0,})/`).transform(arg));
getValue<{ num: `${number}` | `` }>(makeNamedRegExp(`/(?<num>\\d*)/`).transform(arg));
getValue<{ num: `${number}` | `` }>(makeNamedRegExp(`/(?<num>\\d?)/`).transform(arg));

getValue<{ numStr: `${number}${string}` }>(makeNamedRegExp(`/(?<numStr>\\d+[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: `${number}${string}` }>(makeNamedRegExp(`/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: `${number}${string}` }>(makeNamedRegExp(`/(?<numStr>\\d{1,}[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: string }>(makeNamedRegExp(`/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: string }>(makeNamedRegExp(`/(?<numStr>\\d{,3}[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: string }>(makeNamedRegExp(`/(?<numStr>\\d?[amn]+)\\s\\n*/`).transform(arg));
getValue<{ numStr: string }>(makeNamedRegExp(`/(?<numStr>\\d*[amn]+)\\s\\n*/`).transform(arg));

getValue<{ conNum: `text ${number}${`\n${string}` | ``}` }>(
  makeNamedRegExp(`/(?<conNum>text \\d\\n*)/`).transform(arg),
);
getValue<{ conNum: `text ${number}` }>(makeNamedRegExp(`/(?<conNum>text \\d)/`).transform(arg));
getValue<{ num: `text ${number}` }>(makeNamedRegExp(`/(?<num>text \\d{2,3})/`).transform(arg));
getValue<{ num: `text ${number}` }>(makeNamedRegExp(`/(?<num>text \\d{1,})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text \\d{0,3})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text \\d{0,})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text \\d{0})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text \\d{,3})/`).transform(arg));

getValue<{ conNum: `text ${number}` }>(makeNamedRegExp(`/(?<conNum>text [1-3])/`).transform(arg));
getValue<{ conNum: `text ${number}` }>(makeNamedRegExp(`/(?<conNum>text [1-3]+)/`).transform(arg));
getValue<{ num: `text ${number}` }>(makeNamedRegExp(`/(?<num>text [1-3]{1,3})/`).transform(arg));
getValue<{ num: `text ${number}` }>(makeNamedRegExp(`/(?<num>text [1-3]{1,})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text [1-3]{0,3})/`).transform(arg));
getValue<{ num: `text ${number | ``}` }>(makeNamedRegExp(`/(?<num>text [1-3]{,3})/`).transform(arg));
getValue<{ conNum: `text ${number | ``}` }>(makeNamedRegExp(`/(?<conNum>text [1-3]?)/`).transform(arg));
getValue<{ conNum: `text ${number | ``}` }>(makeNamedRegExp(`/(?<conNum>text [1-3]*)/`).transform(arg));

getValue<{ $0: '' | 't' }>(makeNamedRegExp(`/t?/`).transform(arg));
getValue<{ $0: `t${string}` }>(makeNamedRegExp(`/t+/`).transform(arg));
getValue<{ $0: `${`t${string}` | ''}${number}` }>(makeNamedRegExp(`/t*\\d/`).transform(arg));
getValue<{ $0: `t${string}` }>(makeNamedRegExp(`/t{1,3}/`).transform(arg));

getValue<{ num?: `${number}`; bum: `aa` }>(makeNamedRegExp(`/(?<num>[1-3]+)?(?<bum>aa)/`).transform(arg));

getValue<{ txt?: `5` | `${number}` }>(makeNamedRegExp(`/(?<txt>5|\\d)?/`).transform(arg));
getValue<{ txt: `a\\\\|b` | `c` | `${`d` | ``}` }>(makeNamedRegExp(`/(?<txt>a\\\\\\\\\\|b|c|d?)/`).transform(arg));

getValue<{ txt: `a` | `s` | `f\\\\` | `b` | `c${number}` | `d` | string }>(
  makeNamedRegExp(`/(?<txt>a|s|f\\\\\\\\|b|c\\d|d|[-adf ])/`).transform(arg),
);

getValue<{ optional1?: `opt1` | `opt` | undefined }>(
  makeNamedRegExp(`/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/`).transform(arg),
);
getValue<{ num?: `${number}` }>(makeNamedRegExp(`/(?<num>[1-3]+)?/`).transform(arg));
getValue<{ num?: `${number}` }>(makeNamedRegExp(`/(?<num>1|2)?/`).transform(arg));
getValue<{ opt?: ``; opt1?: ``; r: `12` | `` }>(makeNamedRegExp(`/(?<r>12(?<opt>)|(?<opt1>))/`).transform(arg));

const str = `1234567890`;
const a = { b: `` };

getKeys<`str` | `$3` | `$0`, `$2` | `$4` | `$5`>(
  makeNamedRegExp(
    `/\\\\(?<str>\\w+\${)(\\\\ \\d[1,2])?((\\d{3,\${txt}\\${str})|(\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}${str}|${a.b}))/`,
  ).transform(arg),
);

const veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString = `VerY_BIG_StR`;

getValue(
  makeNamedRegExp(
    `/\\(?<!>\\w+\${)(${
      //
      veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString
      //
      //
    } \\d[1,2])?${str}((\\d{3,\${txt}\\${str}<<<)|(\${Disabled_Str}|${
      a.b
    }|(?<name>)[1479]))(?<name1>(?<opt1> \\\\\\(  )|(?<opt2> )|)${veryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryVeryLongString}/`,
  ).transform(arg),
);

getValue(
  makeNamedRegExp(
    // ``,
    `/(?<$0th>(?<$1th>(?<$2nd>){,3})(nonamϭϰe| )+(?<$3th>\\d{2,3}){2,3}\\\\\\\\\\\\\\|\\\${ \\(?<$4>(?<$5th> {3,5}(?<$6th>(?<$7th>(?<$8th>))(){[234]?}(){,})Ϩ)\\)) ${str}in zero/gim`,
  ).transform(arg),
);

getKeys<`$0` | `$0th` | `$2`>(makeNamedRegExp(`/(?<$0th> |sds )(noname|)/gim`).transform(arg));

getValue<{ info?: `[${string}]` }>(
  makeNamedRegExp(
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${
      //
      str
    })(?<associations>_?(?<secretWidStr>[${
      //
      a.b
    }]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
  ).transform(arg),
);

getValue<{ verseSeparator?: string }>(
  makeNamedRegExp(
    `/(?<bookn>\\d?(?!(\\s*([а-яё]+))))\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>(?!\\d{1,3}))(\\s*(?<verseSeparator>[-,]?)\\s*)(?<!finishVerseStr>\\d{1,3})?)?)?/i`,
  ).transform(arg),
);

getValue<{ $2?: `ababa${string}` }>(makeNamedRegExp(`/(?:((?!(ababa+?)) ))(jaja) /`).transform(arg));

getValue<{ $3: `job` }>(makeNamedRegExp(`/(?:((?!(ababa+?)) ))[|](job) /`).transform(arg));

getKeys<`name` | `$2` | `name1` | `$4`>(
  makeNamedRegExp(`/(?<name>n)(?:just 1)(2)(?im-s:just 2)?(?<name1>n1)(?<=just 3)(4)(?<!just 4)/i`).transform(arg),
);

getValue<{ $0: `^^` }>(makeNamedRegExp(`/(\\^)\\1/g`).transform(arg));
getValue<{ $0: `$$` }>(makeNamedRegExp(`/(\\$)\\1/g`).transform(arg));
getValue<{ $0: `\\\x02` }>(makeNamedRegExp(`/(\\\\$)\\2/g`).transform(arg));

getValue<{ $4: '888' }>(
  makeNamedRegExp(
    //X     1             X       2         X   3    X      4
    `/(?:&&)(?<$1th>first)(?: %%%)(?<a> )[|](?:)(888)(?: ){}(\\3)/`,
  ).transform(arg),
);

getValue<{ avvva: ' JJJ' }>(
  makeNamedRegExp(
    //X     1   2               X         3
    `/(?:uN)(FF)(?<avva> JJJ)[|](?:888) {}(?<avvva>\\2)/`,
  ).transform(arg),
);

getValue<{ $0: ` ${string}888=BBB {} ` }>(
  makeNamedRegExp(
    // X    1 X        2         X   3        X      4
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888=BBB)(?: ){}(\\2)/`,
  ).transform(arg),
);

getValue<{ $0: '\\' }>(makeNamedRegExp(`/\\\\/`).transform(arg));
getValue<{ $0: `${string}.a${string}a${string}.` }>(makeNamedRegExp(`/(\\W\\.)a...a\\1/g`).transform(arg));
getValue<{ $0: `%\\% p` }>(makeNamedRegExp(`/(%)\\\\\\1 p/g`).transform(arg));

const abc = `abc`;
getValue<{ $0: `${string}\\${string}` }>(makeNamedRegExp(`/(\\${'1'})\\\\\\1 k/g`).transform(arg));
getValue<{ $0: `\\${string}[${string}\\\\${string}[${string}` }>(
  makeNamedRegExp(`/(\\\\.[${'1'})\\\\\\1 b/g`).transform(arg),
);
getValue<{ $0: `\\${string}\\\\${string} d` }>(makeNamedRegExp(`/(\\\\${abc})\\\\\\1 d/g`).transform(arg));
getValue<{ $0: `$$\\$$` }>(makeNamedRegExp(`/(\\\${2})\\\\\\1/g`).transform(arg));
getValue<{ $0: `\\$$` }>(makeNamedRegExp(`/(\\\\\${2})/g`).transform(arg));
getValue<{ $0: `\\$$` }>(makeNamedRegExp(`/(\\\\\\\${2})/g`).transform(arg));

// @ts-expect-error
getValue<{ $0: `\${2}\\\\\${2}` }>(makeNamedRegExp(`/($\{2})\\\\\\1 be/g`).transform(arg));

getValue<{ $0: `$$\\${'$$' | ''}` }>(makeNamedRegExp(`/(\\\$\{2})\\\\\\1?/g`).transform(arg));
getValue<{ $0: `\${n}\\${`\${n}` | ''} \\<nnn> ` }>(
  makeNamedRegExp(`/(?<nnn>\\\$\{n})\\\\\\k<nnn>? \\<nnn> /g`).transform(arg),
);
getValue<{ $0: `$$\\$$ to` }>(makeNamedRegExp(`/(\\$\{2})\\\\\\1 to/g`).transform(arg));
getValue<{ $0: `$$$$ yy` }>(makeNamedRegExp(`/(?<a>\\$\{2})\\k<a> yy/g`).transform(arg));
getValue<{ $0: `$$$$ tt` }>(makeNamedRegExp(`/(?<a>\\\$\{2})\\k<a> tt/g`).transform(arg));
getValue<{ $0: `${string}${string}` }>(makeNamedRegExp(`/(?<a>\\${'2'})\\k<a>nn/g`).transform(arg));

getValue<{ $0: `\\${string}3}\\\\${string}3} da` }>(makeNamedRegExp(`/(\\\\[\$\{]3})\\\\\\1 da/g`).transform(arg));
getValue<{ $0: `AAA` }>(makeNamedRegExp(`/A{3}/g`).transform(arg));
getValue<{ $0: `$$$` }>(makeNamedRegExp(`/\\\${3}/g`).transform(arg));
getValue<{ $0: `^^^` }>(makeNamedRegExp(`/\\^{3}/g`).transform(arg));
getValue<{ $0: string }>(makeNamedRegExp(`/\\s{3}/g`).transform(arg));

getValue<{ $0: `[${`\\ ` | ``}${string}` }>(makeNamedRegExp(`/(\\[\^\\\\\ \*)\\W\\\\\s\\S\\\\\S/g`).transform(arg));

getValue<{ $0: `${string}4}\\${string}4}` }>(makeNamedRegExp(`/([\\\${\\]]4})\\\\\\1/g`).transform(arg));

getValue<{ $0: `${string}5}${string}5}` }>(
  // @ts-expect-error
  makeNamedRegExp(
    // @ts-expect-error
    `/([\\` +
      //
      123 +
      `\${]5})\\1/g`,
  ).transform(arg),
);

getValue<{ $0: `${string}6}${string}6}` }>(makeNamedRegExp(`/([ \\]\` + \\]\\\`$\{]6})\\1/g`).transform(arg));
getValue<{ $0: `\n` }>(makeNamedRegExp(`/\\n/g`).transform(arg));
getValue<{ $0: `_\` ` }>(makeNamedRegExp(`/_\` ()/g`).transform(arg));
getValue<{ $0: string }>(makeNamedRegExp(`/\\u/g`).transform(arg));

getValue<{ $0: `ac` | `bc` | `c` | `abc` | `bbc` }>(makeNamedRegExp(`/(?:a|(b))\\1c()/`).transform(arg));

getValue<{ $0: `aa` }>(makeNamedRegExp(`/\\1(a)/`).transform(arg));

// circularly references itself
// getValue<{ $0: `` }>(makeNamedRegExp(`/(\\1)/`).transform(arg));

getValue<{ $0: `ss` }>(makeNamedRegExp(`/\\k<self>(?<self>s)/`).transform(arg));
getValue<{ $0: `` }>(makeNamedRegExp(`/(?<self>)/`).transform(arg));

getValue<{ $0: `c`; $1: 'a'; $2: 'b' }>(makeNamedRegExp(`/(?<=(a)(b))c/`).transform(arg));
getValue<{ $0: `c`; $1: string }>(makeNamedRegExp(`/(?<=([ab])+)c/`).transform(arg));
getValue<{ $0: `c`; $1: 'ab' }>(makeNamedRegExp(`/c(?=(ab))/`).transform(arg));

getValue<{ $0: 'abc' | 'abbc' | 'ac' | 'a' | 'ab'; $1?: 'a' }>(
  // @ts-ignore
  makeNamedRegExp(`/(?:(a)|(ab))(?:(c)|(bc))/`).transform(arg),
);

getValue<{ $0: 'WORD' }>(makeNamedRegExp(`/\\bWORD\\B/`).transform(arg));
getValue<{ $0: `${`${`a`}${string}` | ''}b${`a`}${string}` }>(makeNamedRegExp(`/(?=(a+))a*b\\1/`).transform(arg));
getValue<{ $0: `b` }>(makeNamedRegExp(`/(?=a)?b/`).transform(arg));
getValue<{ $0: ''; $1: string }>(makeNamedRegExp(`/(?<=([ab]+)([bc]+))$/`).transform(arg));
getValue<{ $0: `${'-' | ''}${number}${`.${number}` | ''}` }>(
  makeNamedRegExp(`/(?<=\\$)(?<sign>-?)\\d+(?:\\.(\\d+))?/`).transform(arg),
);
getValue<{ $0: `.${'png' | 'gif' | 'jpeg' | 'jpg' | 'PNG' | 'GIF' | 'JPEG' | 'JPG'}` }>(
  makeNamedRegExp(`/\\.(?:png|jpe?g|gif)$/i`).transform(arg),
);
getValue<{ $0: `${'title' | 'name'}=${string}` }>(makeNamedRegExp(`/(?:title|name)=(["'])(.*?)\\1/`).transform(arg));
getValue<{ $0: `${string} ${string} ${string} ${string}  ` }>(
  makeNamedRegExp(`/\\w \\W \\s \\S \\B \\b/`).transform(arg),
);

getValue<{ $0: `1${string | ''}text between${string}${`named group` | ''}${' ' | ''}` }>(
  makeNamedRegExp(`/(1)\\s?text between\\s(?<groupName>named group)?( )?/`).transform(arg),
);

getValue<{ $0: `\\\\&&` }>(makeNamedRegExp(`/\\\\\\\\&{2}/`).transform(arg));

const avvas = `(NI)`;
const justStr = `AI${avvas}N`;
const sym = `R${justStr}`;
const uniqueConstString = `(T${sym}G)`;

getValue<{
  $0: `text TRAINING \${with} \\\${with} {no} {no} \\{no} \\{no} inserts ${'3' | ''} TRAINING`;
  $1: 'TRAINING';
  $2: 'NI';
  $3?: '3';
  $4: 'TRAINING';
  $5: 'NI';
}>(
  makeNamedRegExp(
    `/text ${uniqueConstString} \\\${with} \\\\\\\${with} \${no} $\{no} \\\\$\{no} \\\\\$\{no} inserts (3)? ${uniqueConstString}/`,
  ).transform(arg),
);

const manyGroups =
  `(one(two)(three(four)?(five?))?(six)?(seven(eight|(nine(ten(eleve?n(twelve(13th)?)?))(14th|14|14\\+|abc|plus|minus)(?:\\15))(15th(16th(17th(18th(19th(20th))?)?))))))` as const;

// so large RegExp
getValue(
  makeNamedRegExp(
    // regexpert:
    // stringify $0 $10
    `/(?<group1>${manyGroups})(?<group2>${manyGroups})/`,
  ).transform(arg),
);

const groupContent = `ConTenT`;
const regStrPartWithNamedGroups = `PLU(?<firstG>${groupContent})\\(?<not_group>2\\)(3)\\`;
getValue<{ firstG: typeof groupContent; $4: typeof groupContent }>(
  makeNamedRegExp(`/(?<group1>${regStrPartWithNamedGroups}${escapeRegExpNames(regStrPartWithNamedGroups)})/`).transform(
    arg,
  ),
);

getValue(makeNamedRegExp(`/✙ ✞ ✣ ✨/`).transform(arg));

getValue<{ $0: `<${string}${number}>` }>(makeNamedRegExp(`/<\\P{Script_Extensions=Latin}\\d>/u`).transform(arg));
getValue<{ $0: `<P{ABC}${number}>` }>(makeNamedRegExp(`/<\\P{ABC}\\d>/`).transform(arg));
getValue<{ $0: `<${string}${number}>` }>(makeNamedRegExp(`/<\\xA3\\d>/u`).transform(arg));
getValue<{ $0: `<xA3${number}>` }>(makeNamedRegExp(`/<\\xA3\\d>/`).transform(arg));
getValue<{ $0: `<${string} ${string} ${string} ${string} ${string} ${string} ${number}>` }>(
  makeNamedRegExp(`/<\\xA3 \\cD \\uaBc \\u{a} \\u{abcdef} \\xFA6 \\d>/u`).transform(arg),
);

getValue<{ $0: `<\\+*${'+' | ''}*${string}${`{${string}` | ''}\\${string}>` }>(
  makeNamedRegExp(`/<\\\\\\+\\*\\+?\\*?\\*{2,3}\\{{,5}\\\\+>/`).transform(arg),
);

const hardModificators = `(?<hardModificators>(?:(?:[#b]5)?(?:[#b]7)?(?:[#b]9)?(?:[#b]11)?(?:[#b]13)?))` as const;
const lightModificators = `(?<lightModificators>\\+|(?:(?:min|7?sus|maj|dim|add)?(?:\\d{1,2}(?:/\\d{1,2})?)?))`;
const chordLikeStr = `(?<simpleChord>(?:[ACDFG]#?|[EH])m?)${lightModificators}${hardModificators}?` as const;

getValue<{ simpleChord_bass?: string }>(
  makeNamedRegExp(
    // regexpert:
    // stringify $0 U23
    `/^\\.*-?${chordLikeStr}(?<bassChord>/${
      //
      escapeRegExpNames(chordLikeStr, '_bass')
    })?(?<repeats>(?:(?:\\.+|-|\\.+-)${
      //
      escapeRegExpNames(chordLikeStr, '_lastRepeat')
    }(?:/${
      //
      escapeRegExpNames(chordLikeStr, `_lastRepeatBass`)
    })?)*)$/`,
  ).transform(arg),
);

getKeys<'$0' | '$2' | '$4' | '$6' | '$7', '$1' | '$3' | '$5' | '$8' | '$9'>(
  makeNamedRegExp(`/(){,1000}((){,1888})(|())(()(())?){2,3}?/`).transform(arg),
);
