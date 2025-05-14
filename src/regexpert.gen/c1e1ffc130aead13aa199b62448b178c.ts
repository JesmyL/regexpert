/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../test');

namespace Nc1e1ffc130aead13aa199b62448b178c_1 {
  type $0 = $str;
  type $str = RepeatingString<string>;

  export interface I extends Record<
    `/(?<str>\\w+)/`,
    {
      $0: $0;
      str: $str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_2 {
  type $0 = $str;
  type $str = string | '';

  export interface I extends Record<
    `/(?<str>\\w?)/`,
    {
      $0: $0;
      str: $str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_3 {
  type $0 = $str;
  type $str = `${`a` | ''}`;

  export interface I extends Record<
    `/(?<str>a?)/`,
    {
      $0: $0;
      str: $str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_4 {
  type $0 = `${$str}${$2}${$stri}${$$str}`;
  type $str = RepeatingString<string>;
  type $2 = ``;
  type $stri = ` `;
  type $$str = `   ${$$$str}`;
  type $$$str = ``;

  export interface I extends Record<
    `/(?<str>\\w+)()(?<$stri> )(?<$str>   (?<$$str>))/`,
    {
      $0: $0;
      str: $str;
      $2: $2;
      $stri: $stri;
      $str: $$str;
      $$str: $$$str
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_5 {
  type $0 = $val;
  type $val = `text`;

  export interface I extends Record<
    `/(?<val>text)/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_6 {
  type $0 = $val;
  type $val = `text ${number}`;

  export interface I extends Record<
    `/(?<val>text \\d+)/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_7 {
  type $0 = $val;
  type $val = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<val>text \\d*)/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_8 {
  type $0 = $val;
  type $val = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<val>text \\d?)/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_9 {
  type $0 = $val;
  type $val = `text${string}`;

  export interface I extends Record<
    `/(?<val>text{1,3})/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_10 {
  type $0 = $val;
  type $val = `tex${OptRepeatingString<`t`>}`;

  export interface I extends Record<
    `/(?<val>text{0,3})/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_11 {
  type $0 = $val;
  type $val = `tex${OptRepeatingString<`t`>}`;

  export interface I extends Record<
    `/(?<val>text{0,})/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_12 {
  type $0 = $val;
  type $val = `tex${OptRepeatingString<`t`>}`;

  export interface I extends Record<
    `/(?<val>text{,3})/`,
    {
      $0: $0;
      val: $val
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_13 {
  type $0 = $num;
  type $num = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d)/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_14 {
  type $0 = $num;
  type $num = `${number}`;

  export interface I extends Record<
    `/(?<num>\\d{1,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_15 {
  type $0 = $num;
  type $num = `${number | ``}`;

  export interface I extends Record<
    `/(?<num>\\d{,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_16 {
  type $0 = $num;
  type $num = `${number | ``}`;

  export interface I extends Record<
    `/(?<num>\\d{0,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_17 {
  type $0 = $num;
  type $num = `${number | ``}`;

  export interface I extends Record<
    `/(?<num>\\d{0,})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_18 {
  type $0 = $num;
  type $num = `${number | ``}`;

  export interface I extends Record<
    `/(?<num>\\d*)/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_19 {
  type $0 = $num;
  type $num = `${number | ``}`;

  export interface I extends Record<
    `/(?<num>\\d?)/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_20 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d+[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_21 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_22 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d{1,}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_23 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number | ``}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d{0,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_24 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number | ``}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d{,3}[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_25 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number | ``}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d?[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_26 {
  type $0 = `${$numStr}${string}${OptRepeatingString<`\n`>}`;
  type $numStr = `${number | ``}${RepeatingString<string>}`;

  export interface I extends Record<
    `/(?<numStr>\\d*[amn]+)\\s\\n*/`,
    {
      $0: $0;
      numStr: $numStr
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_27 {
  type $0 = $conNum;
  type $conNum = `text ${number}${OptRepeatingString<`\n`>}`;

  export interface I extends Record<
    `/(?<conNum>text \\d\\n*)/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_28 {
  type $0 = $conNum;
  type $conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text \\d)/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_29 {
  type $0 = $num;
  type $num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{2,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_30 {
  type $0 = $num;
  type $num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text \\d{1,})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_31 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_32 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text \\d{0,})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_33 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text \\d{0})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_34 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text \\d{,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_35 {
  type $0 = $conNum;
  type $conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3])/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_36 {
  type $0 = $conNum;
  type $conNum = `text ${number}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]+)/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_37 {
  type $0 = $num;
  type $num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_38 {
  type $0 = $num;
  type $num = `text ${number}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{1,})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_39 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{0,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_40 {
  type $0 = $num;
  type $num = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<num>text [1-3]{,3})/`,
    {
      $0: $0;
      num: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_41 {
  type $0 = $conNum;
  type $conNum = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]?)/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_42 {
  type $0 = $conNum;
  type $conNum = `text ${number | ``}`;

  export interface I extends Record<
    `/(?<conNum>text [1-3]*)/`,
    {
      $0: $0;
      conNum: $conNum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_43 {
  type $0 = `${`t` | ''}`;

  export interface I extends Record<
    `/t?/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_44 {
  type $0 = `${RepeatingString<`t`>}`;

  export interface I extends Record<
    `/t+/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_45 {
  type $0 = `${OptRepeatingString<`t`>}${number}`;

  export interface I extends Record<
    `/t*\\d/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_46 {
  type $0 = `t${string}`;

  export interface I extends Record<
    `/t{1,3}/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_47 {
  type $0 = `${$num | ''}${$bum}`;
  type $num = `${number}`;
  type $bum = `aa`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?(?<bum>aa)/`,
    {
      $0: $0;
      num?: $num;
      bum: $bum
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_48 {
  type $0 = $txt | '';
  type $txt = `5` | `${number}`;

  export interface I extends Record<
    `/(?<txt>5|\\d)?/`,
    {
      $0: $0;
      txt?: $txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_49 {
  type $0 = $txt;
  type $txt = `a\\\\|b` | `c` | `${`d` | ''}`;

  export interface I extends Record<
    `/(?<txt>a\\\\\\\\\\|b|c|d?)/`,
    {
      $0: $0;
      txt: $txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_50 {
  type $0 = $txt;
  type $txt = `a` | `s` | `f\\\\` | `b` | `c${number}` | `d` | string;

  export interface I extends Record<
    `/(?<txt>a|s|f\\\\\\\\|b|c\\d|d|[-adf ])/`,
    {
      $0: $0;
      txt: $txt
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_51 {
  type $0 = $optional1 | `${$optional2}${$req}`;
  type $optional1 = `opt1` | `opt`;
  type $optional2 = `opt2`;
  type $req = `req`;

  export interface I extends Record<
    `/(?<optional1>opt1|opt)|(?<optional2>opt2)(?<req>req)/`,
    {
      $0: $0;
      optional1?: $optional1;
      optional2?: $optional2;
      req?: $req
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_52 {
  type $0 = $num | '';
  type $num = `${number}`;

  export interface I extends Record<
    `/(?<num>[1-3]+)?/`,
    {
      $0: $0;
      num?: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_53 {
  type $0 = $num | '';
  type $num = `1` | `2`;

  export interface I extends Record<
    `/(?<num>1|2)?/`,
    {
      $0: $0;
      num?: $num
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_54 {
  type $0 = $r;
  type $r = `12${$opt}` | $opt1;
  type $opt = ``;
  type $opt1 = ``;

  export interface I extends Record<
    `/(?<r>12(?<opt>)|(?<opt1>))/`,
    {
      $0: $0;
      r: $r;
      opt?: $opt;
      opt1?: $opt1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_55 {
  type $0 = `\\${$str}${$2 | ''}${$3}`;
  type $str = `${RepeatingString<string>}{`;
  type $2 = `\\ ${number}${string}`;
  type $3 = $4 | $5;
  type $4 = `${number}{3,{txt}\x1234567890`;
  type $5 = `\${txt}\\{txt1}\\\${txt2}\\\\{txt3}1234567890` | string;

  export interface I extends Record<
    `/\\\\(?<str>\\w+\${)(\\\\ \\d[1,2])?((\\d{3,\${txt}\\1234567890)|(\\\${txt}\\\\\${txt1}\\\\\\\${txt2}\\\\\\\\\${txt3}1234567890|${string}))/`,
    {
      $0: $0;
      str: $str;
      $2?: $2;
      $3: $3;
      $4?: $4;
      $5?: $5
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_56 {
  type $0 = `${`(` | ''}<!>${RepeatingString<string>}{)${$1 | ''}1234567890${$2}${$name1}VerY_BIG_StR`;
  type $1 = `VerY_BIG_StR ${number}${string}`;
  type $2 = $3 | $4;
  type $3 = `${number}{3,{txt}\x1234567890<<<`;
  type $4 = `{Disabled_Str}` | string | `${$name}${number}`;
  type $name = ``;
  type $name1 = $opt1 | $opt2 | ``;
  type $opt1 = ` \\(  `;
  type $opt2 = ` `;

  export interface I extends Record<
    `/\\(?<!>\\w+\${)(VerY_BIG_StR \\d[1,2])?1234567890((\\d{3,\${txt}\\1234567890<<<)|(\${Disabled_Str}|${string}|(?<name>)[1479]))(?<name1>(?<opt1> \\\\\\(  )|(?<opt2> )|)VerY_BIG_StR/`,
    {
      $0: $0;
      $1?: $1;
      $2: $2;
      $3?: $3;
      $4?: $4;
      name?: $name;
      name1: $name1;
      opt1?: $opt1;
      opt2?: $opt2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_57 {
  type $0 = `${$0th} 1234567890in zero`;
  type $0th = `${$1th}${$4}${$3th}\\\\\\|\${ ${`(` | ''}<4>${$5th})`;
  type $1th = $2nd | '';
  type $2nd = ``;
  type $4 = `nonamϭϰe` | ` `;
  type $3th = `${number}`;
  type $5th = ` ${string}${$6th}Ϩ`;
  type $6th = `${$7th}${$10}{${number | ``}}${$11}{,}`;
  type $7th = $8th;
  type $8th = ``;
  type $10 = ``;
  type $11 = ``;

  export interface I extends Record<
    `/(?<$0th>(?<$1th>(?<$2nd>){,3})(nonamϭϰe| )+(?<$3th>\\d{2,3}){2,3}\\\\\\\\\\\\\\|\\\${ \\(?<$4>(?<$5th> {3,5}(?<$6th>(?<$7th>(?<$8th>))(){[234]?}(){,})Ϩ)\\)) 1234567890in zero/gim`,
    IgnoreCaseRecord<{
      $0: $0;
      $0th: $0th;
      $1th: $1th;
      $2nd?: $2nd;
      $4: $4;
      $3th: $3th;
      $5th: $5th;
      $6th: $6th;
      $7th: $7th;
      $8th: $8th;
      $10: $10;
      $11: $11
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_58 {
  type $0 = `${$0th}${$2}`;
  type $0th = ` ` | `sds `;
  type $2 = `noname` | ``;

  export interface I extends Record<
    `/(?<$0th> |sds )(noname|)/gim`,
    IgnoreCaseRecord<{
      $0: $0;
      $0th: $0th;
      $2: $2
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_59 {
  type $0 = `${$before}${$beforeSpaces}${$hashes}${$blockHashPosition}${$associations | ''}${OptRepeatingString<` `>}${$info | ''}${$beforeCommentSpaces}${$comment}${U1}`;
  type $before = `` | `\n`;
  type $beforeSpaces = `${OptRepeatingString<` `>}`;
  type $hashes = `#${string}`;
  type $blockHashPosition = `1234567890`;
  type $associations = `${`_` | ''}${$secretWidStr}${$modificators}`;
  type $secretWidStr = OptRepeatingString<string>;
  type $modificators = `${`!` | ''}`;
  type $info = `[${$blockHeader}]`;
  type $blockHeader = RepeatingString<string>;
  type $beforeCommentSpaces = $beforeSpaces;
  type $comment = RepeatingString<string>;
  
  type U1 = LookaheadAssertion<`\n${OptRepeatingString<` `>}#` | ``>;

  export interface I extends Record<
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>1234567890)(?<associations>_?(?<secretWidStr>[${string}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    {
      $0: $0;
      before: $before;
      beforeSpaces: $beforeSpaces;
      hashes: $hashes;
      blockHashPosition: $blockHashPosition;
      associations?: $associations;
      secretWidStr?: $secretWidStr;
      modificators?: $modificators;
      info?: $info;
      blockHeader?: $blockHeader;
      beforeCommentSpaces: $beforeCommentSpaces;
      comment: $comment
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_60 {
  type $0 = `${$bookn}${OptRepeatingString<string>}${$4 | ''}`;
  type $bookn = `${number | ``}${U1}`;
  type $2 = `${OptRepeatingString<string>}${$3}`;
  type $3 = RepeatingString<string>;
  type $4 = `${$chapterStr}${$6 | ''}`;
  type $chapterStr = `${number}`;
  type $6 = `${$7}${$verseStr}${$9}${U3 | ''}`;
  type $7 = `:` | RepeatingString<string>;
  type $verseStr = U2;
  type $9 = `${OptRepeatingString<string>}${$verseSeparator}${OptRepeatingString<string>}`;
  type $verseSeparator = string | '';
  
  type U1 = LookaheadAssertion<$2>;
  type U2 = $chapterStr;
  type U3 = LookbehindAssertion<`finishVerseStr>${number}`>;

  export interface I extends Record<
    `/(?<bookn>\\d?(?!(\\s*([а-яё]+))))\\s*((?<chapterStr>\\d{1,3})((:|\\s+)(?<verseStr>(?!\\d{1,3}))(\\s*(?<verseSeparator>[-,]?)\\s*)(?<!finishVerseStr>\\d{1,3})?)?)?/i`,
    IgnoreCaseRecord<{
      $0: $0;
      bookn: $bookn;
      $2?: $2;
      $3?: $3;
      $4?: $4;
      chapterStr?: $chapterStr;
      $6?: $6;
      $7?: $7;
      verseStr?: $verseStr;
      $9?: $9;
      verseSeparator?: $verseSeparator
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_61 {
  type $0 = `${U1}${$3} `;
  type $1 = `${U2} `;
  type $2 = `abab${RepeatingString<`a`>}`;
  type $3 = `jaja`;
  
  type U1 = $1;
  type U2 = LookaheadAssertion<$2>;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))(jaja) /`,
    {
      $0: $0;
      $1: $1;
      $2?: $2;
      $3: $3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_62 {
  type $0 = `${U1}${string}${$3} `;
  type $1 = `${U2} `;
  type $2 = `abab${RepeatingString<`a`>}`;
  type $3 = `job`;
  
  type U1 = $1;
  type U2 = LookaheadAssertion<$2>;

  export interface I extends Record<
    `/(?:((?!(ababa+?)) ))[|](job) /`,
    {
      $0: $0;
      $1: $1;
      $2?: $2;
      $3: $3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_63 {
  type $0 = `${$name}${U1}${$2}${U2 | ''}${$name1}${U3}${$4}${U4}`;
  type $name = `n`;
  type $2 = `2`;
  type $name1 = `n1`;
  type $4 = `4`;
  
  type U1 = `just 1`;
  type U2 = `just 2`;
  type U3 = LookbehindAssertion<`just 3`>;
  type U4 = LookbehindAssertion<`just 4`>;

  export interface I extends Record<
    `/(?<name>n)(?:just 1)(2)(?im-s:just 2)?(?<name1>n1)(?<=just 3)(4)(?<!just 4)/i`,
    IgnoreCaseRecord<{
      $0: $0;
      name: $name;
      $2: $2;
      name1: $name1;
      $4: $4
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_64 {
  type $0 = `${$1}${$1}`;
  type $1 = `^`;

  export interface I extends Record<
    `/(\\^)\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_65 {
  type $0 = `${$1}${$1}`;
  type $1 = `$`;

  export interface I extends Record<
    `/(\\$)\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_66 {
  type $0 = `${$1}\x02`;
  type $1 = `\\`;

  export interface I extends Record<
    `/(\\\\$)\\2/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_67 {
  type $0 = `${U1}${$1th}${U2}${$a}${string}${U3}${$3}${U4}{}${$4}`;
  type $1th = `first`;
  type $a = ` `;
  type $3 = `888`;
  type $4 = $3;
  
  type U1 = `&&`;
  type U2 = ` %%%`;
  type U3 = ``;
  type U4 = $a;

  export interface I extends Record<
    `/(?:&&)(?<$1th>first)(?: %%%)(?<a> )[|](?:)(888)(?: ){}(\\3)/`,
    {
      $0: $0;
      $1th: $1th;
      a: $a;
      $3: $3;
      $4: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_68 {
  type $0 = `${U1}${$1}${$avva}${string}${U2} {}${$avvva}`;
  type $1 = `FF`;
  type $avva = ` JJJ`;
  type $avvva = $avva;
  
  type U1 = `uN`;
  type U2 = `888`;

  export interface I extends Record<
    `/(?:uN)(FF)(?<avva> JJJ)[|](?:888) {}(?<avvva>\\2)/`,
    {
      $0: $0;
      $1: $1;
      avva: $avva;
      avvva: $avvva
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_69 {
  type $0 = `${U1}${$1}${U2}${$a}${string}${U3}${$3}${U4}{}${$4}`;
  type $1 = ``;
  type $a = ` `;
  type $3 = `888=BBB`;
  type $4 = $a;
  
  type U1 = LookaheadAssertion<`&&`>;
  type U2 = LookbehindAssertion<` %%%`>;
  type U3 = ``;
  type U4 = $a;

  export interface I extends Record<
    `/(?!&&)()(?<! %%%)(?<a> )[|](?:)(888=BBB)(?: ){}(\\2)/`,
    {
      $0: $0;
      $1: $1;
      a: $a;
      $3: $3;
      $4: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_70 {
  type $0 = `\\`;

  export interface I extends Record<
    `/\\\\/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_71 {
  type $0 = `${$1}a${string}a${$1}`;
  type $1 = `${string}.`;

  export interface I extends Record<
    `/(\\W\\.)a...a\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_72 {
  type $0 = `${$1}\\${$1} p`;
  type $1 = `%`;

  export interface I extends Record<
    `/(%)\\\\\\1 p/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_73 {
  type $0 = `${$1}\\${$1} k`;
  type $1 = '1';

  export interface I extends Record<
    `/(\\${'1'})\\\\\\1 k/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_74 {
  type $0 = `${$1}\\${$1} b`;
  type $1 = `\\${string}[${string}`;

  export interface I extends Record<
    `/(\\\\.[${string})\\\\\\1 b/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_75 {
  type $0 = `${$1}\\${$1} d`;
  type $1 = `\\abc`;

  export interface I extends Record<
    `/(\\\\abc)\\\\\\1 d/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_76 {
  type $0 = `${$1}\\${$1}`;
  type $1 = `$$`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_77 {
  type $0 = $1;
  type $1 = `\\$$`;

  export interface I extends Record<
    `/(\\\\\${2})/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_78 {
  type $0 = $1;
  type $1 = `\\$$`;

  export interface I extends Record<
    `/(\\\\\\\${2})/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_79 {
  type $0 = `${$1}\\${$1} be`;
  type $1 = `$$`;

  export interface I extends Record<
    `/(\${2})\\\\\\1 be/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_80 {
  type $0 = `${$1}\\${$1 | ''}`;
  type $1 = `$$`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1?/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_81 {
  type $0 = `${$nnn}\\${$nnn | ''} \\<nnn> `;
  type $nnn = `\${n}`;

  export interface I extends Record<
    `/(?<nnn>\\\${n})\\\\\\k<nnn>? \\<nnn> /g`,
    {
      $0: $0;
      nnn: $nnn
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_82 {
  type $0 = `${$1}\\${$1} to`;
  type $1 = `$$`;

  export interface I extends Record<
    `/(\\\${2})\\\\\\1 to/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_83 {
  type $0 = `${$a}${$a} yy`;
  type $a = `$$`;

  export interface I extends Record<
    `/(?<a>\\\${2})\\k<a> yy/g`,
    {
      $0: $0;
      a: $a
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_84 {
  type $0 = `${$a}${$a} tt`;
  type $a = `$$`;

  export interface I extends Record<
    `/(?<a>\\\${2})\\k<a> tt/g`,
    {
      $0: $0;
      a: $a
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_85 {
  type $0 = `${$a}${$a}nn`;
  type $a = '2';

  export interface I extends Record<
    `/(?<a>\\${'2'})\\k<a>nn/g`,
    {
      $0: $0;
      a: $a
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_86 {
  type $0 = `${$1}\\${$1} da`;
  type $1 = `\\${string}3}`;

  export interface I extends Record<
    `/(\\\\${string}3})\\\\\\1 da/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_87 {
  type $0 = `AAA`;

  export interface I extends Record<
    `/A{3}/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_88 {
  type $0 = `$$$`;

  export interface I extends Record<
    `/\\\${3}/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_89 {
  type $0 = `^^^`;

  export interface I extends Record<
    `/\\^{3}/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_90 {
  type $0 = string;

  export interface I extends Record<
    `/\\s{3}/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_91 {
  type $0 = `${$1}${string}`;
  type $1 = `[\\${OptRepeatingString<` `>}`;

  export interface I extends Record<
    `/(\\[^\\\\ *)\\W\\\\s\\S\\\\S/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_92 {
  type $0 = `${$1}\\${$1}`;
  type $1 = `${string}4}`;

  export interface I extends Record<
    `/([\\\${\\]]4})\\\\\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_93 {
  type $0 = ``;

  export interface I extends Record<
    `//[`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_94 {
  type $0 = `${$1}${$1}`;
  type $1 = `${string}6}`;

  export interface I extends Record<
    `/([ \\]\` + \\]\\\`\${]6})\\1/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_95 {
  type $0 = `\n`;

  export interface I extends Record<
    `/\\n/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_96 {
  type $0 = `_\` ${$1}`;
  type $1 = ``;

  export interface I extends Record<
    `/_\` ()/g`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_97 {
  type $0 = string;

  export interface I extends Record<
    `/\\u/g`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_98 {
  type $0 = `${U1}${$1 | ''}c${$2}`;
  type $1 = `b`;
  type $2 = ``;
  
  type U1 = `a` | $1;

  export interface I extends Record<
    `/(?:a|(b))\\1c()/`,
    {
      $0: $0;
      $1?: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_99 {
  type $0 = `${$1}${$1}`;
  type $1 = `a`;

  export interface I extends Record<
    `/\\1(a)/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_100 {
  type $0 = `${$self}${$self}`;
  type $self = `s`;

  export interface I extends Record<
    `/\\k<self>(?<self>s)/`,
    {
      $0: $0;
      self: $self
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_101 {
  type $0 = $self;
  type $self = ``;

  export interface I extends Record<
    `/(?<self>)/`,
    {
      $0: $0;
      self: $self
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_102 {
  type $0 = `${U1}c`;
  type $1 = `a`;
  type $2 = `b`;
  
  type U1 = LookbehindAssertion<`${$1}${$2}`>;

  export interface I extends Record<
    `/(?<=(a)(b))c/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_103 {
  type $0 = `${U1}c`;
  type $1 = string;
  
  type U1 = LookbehindAssertion<$1>;

  export interface I extends Record<
    `/(?<=([ab])+)c/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_104 {
  type $0 = `c${U1}`;
  type $1 = `ab`;
  
  type U1 = LookaheadAssertion<$1>;

  export interface I extends Record<
    `/c(?=(ab))/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_105 {
  type $0 = `${U1}${U2}`;
  type $1 = `a`;
  type $2 = `ab`;
  type $3 = `c`;
  type $4 = `bc`;
  
  type U1 = $1 | $2;
  type U2 = $3 | $4;

  export interface I extends Record<
    `/(?:(a)|(ab))(?:(c)|(bc))/`,
    {
      $0: $0;
      $1?: $1;
      $2?: $2;
      $3?: $3;
      $4?: $4
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_106 {
  type $0 = `WORD`;

  export interface I extends Record<
    `/\\bWORD\\B/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_107 {
  type $0 = `${U1}${OptRepeatingString<`a`>}b${$1}`;
  type $1 = `${RepeatingString<`a`>}`;
  
  type U1 = LookaheadAssertion<$1>;

  export interface I extends Record<
    `/(?=(a+))a*b\\1/`,
    {
      $0: $0;
      $1: $1
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_108 {
  type $0 = `${U1 | ''}b`;
  
  type U1 = LookaheadAssertion<`a`>;

  export interface I extends Record<
    `/(?=a)?b/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_109 {
  type $0 = U1;
  type $1 = RepeatingString<string>;
  type $2 = $1;
  
  type U1 = LookbehindAssertion<`${$1}${$2}`>;

  export interface I extends Record<
    `/(?<=([ab]+)([bc]+))$/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_110 {
  type $0 = `${U1}${$sign}${number}${U2 | ''}`;
  type $sign = `${`-` | ''}`;
  type $2 = `${number}`;
  
  type U1 = LookbehindAssertion<`$`>;
  type U2 = `.${$2}`;

  export interface I extends Record<
    `/(?<=\\$)(?<sign>-?)\\d+(?:\\.(\\d+))?/`,
    {
      $0: $0;
      sign: $sign;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_111 {
  type $0 = `.${U1}`;
  
  type U1 = `png` | `jp${`e` | ''}g` | `gif`;

  export interface I extends Record<
    `/\\.(?:png|jpe?g|gif)$/i`,
    IgnoreCaseRecord<{
      $0: $0
    }>
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_112 {
  type $0 = `${U1}=${$1}${$2}${$1}`;
  type $1 = string;
  type $2 = string | '';
  
  type U1 = `title` | `name`;

  export interface I extends Record<
    `/(?:title|name)=(["'])(.*?)\\1/`,
    {
      $0: $0;
      $1: $1;
      $2: $2
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_113 {
  type $0 = `${string} ${string} ${string} ${string}  `;

  export interface I extends Record<
    `/\\w \\W \\s \\S \\B \\b/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_114 {
  type $0 = `${$1}${string | ''}text between${string}${$groupName | ''}${$3 | ''}`;
  type $1 = `1`;
  type $groupName = `named group`;
  type $3 = ` `;

  export interface I extends Record<
    `/(1)\\s?text between\\s(?<groupName>named group)?( )?/`,
    {
      $0: $0;
      $1: $1;
      groupName?: $groupName;
      $3?: $3
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_115 {
  type $0 = `\\\\&&`;

  export interface I extends Record<
    `/\\\\\\\\&{2}/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_116 {
  type $0 = `text ${$1} \${with} \\\${with} {no} {no} \\{no} \\{no} inserts ${$3 | ''} ${$4}`;
  type $1 = `TRAI${$2}NG`;
  type $2 = `NI`;
  type $3 = `3`;
  type $4 = `TRAI${$5}NG`;
  type $5 = $2;

  export interface I extends Record<
    `/text (TRAI(NI)NG) \\\${with} \\\\\\\${with} \${no} \${no} \\\\\${no} \\\\\${no} inserts (3)? (TRAI(NI)NG)/`,
    {
      $0: $0;
      $1: $1;
      $2: $2;
      $3?: $3;
      $4: $4;
      $5: $5
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_117 {
  type $0 = string; // `${$group1}${$group2}`;
  type $group1 = $2;
  type $2 = `one${$3}${$4 | ''}${$7 | ''}${$8}`;
  type $3 = `two`;
  type $4 = `three${$5 | ''}${$6}`;
  type $5 = `four`;
  type $6 = `fiv${`e` | ''}`;
  type $7 = `six`;
  type $8 = `seven${$9}`;
  type $9 = `eight` | `${$10}${$16}`;
  type $10 = string; // `nine${$11}${$15}${U1}`;
  type $11 = `ten${$12}`;
  type $12 = `elev${`e` | ''}n${$13 | ''}`;
  type $13 = `twelve${$14 | ''}`;
  type $14 = `13th`;
  type $15 = `14th` | `14` | `14+` | `abc` | `plus` | `minus`;
  type $16 = `15th${$17}`;
  type $17 = `16th${$18}`;
  type $18 = `17th${$19 | ''}`;
  type $19 = `18th${$20 | ''}`;
  type $20 = `19th${$21}`;
  type $21 = `20th`;
  type $group2 = $23;
  type $23 = `one${$24}${$25 | ''}${$28 | ''}${$29}`;
  type $24 = $3;
  type $25 = `three${$26 | ''}${$27}`;
  type $26 = $5;
  type $27 = $6;
  type $28 = $7;
  type $29 = `seven${$30}`;
  type $30 = `eight` | `${$31}${$37}`;
  type $31 = `nine${$32}${$36}${U2}`;
  type $32 = `ten${$33}`;
  type $33 = `elev${`e` | ''}n${$34 | ''}`;
  type $34 = `twelve${$35 | ''}`;
  type $35 = $14;
  type $36 = $15;
  type $37 = `15th${$38}`;
  type $38 = `16th${$39}`;
  type $39 = `17th${$40 | ''}`;
  type $40 = `18th${$41 | ''}`;
  type $41 = `19th${$42}`;
  type $42 = $21;
  
  type U1 = $15 | '';
  type U2 = U1;

  export interface I extends Record<
    `/(?<group1>(one(two)(three(four)?(five?))?(six)?(seven(eight|(nine(ten(eleve?n(twelve(13th)?)?))(14th|14|14\\+|abc|plus|minus)(?:\\15))(15th(16th(17th(18th(19th(20th))?)?)))))))(?<group2>(one(two)(three(four)?(five?))?(six)?(seven(eight|(nine(ten(eleve?n(twelve(13th)?)?))(14th|14|14\\+|abc|plus|minus)(?:\\15))(15th(16th(17th(18th(19th(20th))?)?)))))))/`,
    {
      $0: $0;
      group1: $group1;
      $2: $2;
      $3: $3;
      $4?: $4;
      $5?: $5;
      $6?: $6;
      $7?: $7;
      $8: $8;
      $9: $9;
      $10?: $10;
      $11?: $11;
      $12?: $12;
      $13?: $13;
      $14?: $14;
      $15?: $15;
      $16?: $16;
      $17?: $17;
      $18?: $18;
      $19?: $19;
      $20?: $20;
      $21?: $21;
      group2: $group2;
      $23: $23;
      $24: $24;
      $25?: $25;
      $26?: $26;
      $27?: $27;
      $28?: $28;
      $29: $29;
      $30: $30;
      $31?: $31;
      $32?: $32;
      $33?: $33;
      $34?: $34;
      $35?: $35;
      $36?: $36;
      $37?: $37;
      $38?: $38;
      $39?: $39;
      $40?: $40;
      $41?: $41;
      $42?: $42
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_118 {
  type $0 = $group1;
  type $group1 = `PLU${$firstG}${`(` | ''}<not_group>2)${$3}PLU${$4}${`(` | ''}<not_group>2)${$5}`;
  type $firstG = `ConTenT`;
  type $3 = `3`;
  type $4 = $firstG;
  type $5 = $3;

  export interface I extends Record<
    `/(?<group1>PLU(?<firstG>ConTenT)\\(?<not_group>2\\)(3)\\PLU(?<firstG>ConTenT)\\(?<not_group>2\\)(3)\\)/`,
    {
      $0: $0;
      group1: $group1;
      firstG: $firstG;
      $3: $3;
      $4: $4;
      $5: $5
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_119 {
  type $0 = `✙ ✞ ✣ ✨`;

  export interface I extends Record<
    `/✙ ✞ ✣ ✨/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_120 {
  type $0 = `<${string}${number}>`;

  export interface I extends Record<
    `/<\\P{Script_Extensions=Latin}\\d>/u`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_121 {
  type $0 = `<P{ABC}${number}>`;

  export interface I extends Record<
    `/<\\P{ABC}\\d>/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_122 {
  type $0 = `<${string}${number}>`;

  export interface I extends Record<
    `/<\\xA3\\d>/u`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_123 {
  type $0 = `<xA3${number}>`;

  export interface I extends Record<
    `/<\\xA3\\d>/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_124 {
  type $0 = `<${string} ${string} ${string}aBc ${string} ${string} ${string}6 ${number}>`;

  export interface I extends Record<
    `/<\\xA3 \\cD \\uaBc \\u{a} \\u{abcdef} \\xFA6 \\d>/u`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_125 {
  type $0 = `<\\+*${`+` | ''}${`*` | ''}*${string}${OptRepeatingString<`{`>}${RepeatingString<`\\`>}>`;

  export interface I extends Record<
    `/<\\\\\\+\\*\\+?\\*?\\*{2,3}\\{{,5}\\\\+>/`,
    {
      $0: $0
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_126 {
  type $0 = string; // `${OptRepeatingString<`.`>}${`-` | ''}${$simpleChord}${$2}${$hardModificators | ''}${$bassChord | ''}${$16 | ''}`;
  type $simpleChord = `${string}${`#` | ''}` | string;
  type $2 = `+` | `11` | $3;
  type $3 = `${$4 | ''}${$5 | ''}`;
  type $4 = `m` | `min` | `${`7` | ''}sus` | `maj` | `dim` | `add`;
  type $5 = `${number}${$6 | ''}`;
  type $6 = `/${number}`;
  type $hardModificators = `${string}${U1}`;
  type $bassChord = `/${$simpleChord_bassChord}${$10}${$hardModificators_bassChord | ''}`;
  type $simpleChord_bassChord = $simpleChord;
  type $10 = `+` | `11` | $11;
  type $11 = `${$12 | ''}${$13 | ''}`;
  type $12 = $4;
  type $13 = `${number}${$14 | ''}`;
  type $14 = $6;
  type $hardModificators_bassChord = `${string}${U2}`;
  type $16 = `${$dotSeparations}${$18}${$19}${$24 | ''}${$25 | ''}`;
  type $dotSeparations = `${RepeatingString<`.`>}` | `-` | `${RepeatingString<`.`>}-`;
  type $18 = $simpleChord;
  type $19 = `+` | `11` | $20;
  type $20 = `${$21 | ''}${$22 | ''}`;
  type $21 = $4;
  type $22 = `${number}${$23 | ''}`;
  type $23 = $6;
  type $24 = $hardModificators;
  type $25 = `/${$26}${$27}${$32 | ''}`;
  type $26 = $simpleChord;
  type $27 = `+` | `11` | $28;
  type $28 = `${$29 | ''}${$30 | ''}`;
  type $29 = $4;
  type $30 = `${number}${$31 | ''}`;
  type $31 = $6;
  type $32 = $hardModificators;
  
  type U1 = `5` | `7` | `9` | `11` | `13`;
  type U2 = U1;
  type U3 = U1;
  type U4 = U1;

  export interface I extends Record<
    `/^\\.*-?(?<simpleChord>[ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))(?<hardModificators>[#b](?:5|7|9|11|13))*(?<bassChord>/(?<simpleChord>[ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))(?<hardModificators>[#b](?:5|7|9|11|13))*)?((?<dotSeparations>\\.+|-|\\.+-)(?<simpleChord>[ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))(?<hardModificators>[#b](?:5|7|9|11|13))*(/(?<simpleChord>[ACDFG]#?|[EH])(\\+|11|((m|min|7?sus|maj|dim|add)?(\\d{1,2}(/\\d{1,2})?)?))(?<hardModificators>[#b](?:5|7|9|11|13))*)?)*$/`,
    {
      $0: $0;
      simpleChord: $simpleChord;
      $2: $2;
      $3?: $3;
      $4?: $4;
      $5?: $5;
      $6?: $6;
      hardModificators?: $hardModificators;
      bassChord?: $bassChord;
      simpleChord_bassChord?: $simpleChord_bassChord;
      $10?: $10;
      $11?: $11;
      $12?: $12;
      $13?: $13;
      $14?: $14;
      hardModificators_bassChord?: $hardModificators_bassChord;
      $16?: $16;
      dotSeparations?: $dotSeparations;
      $18?: $18;
      $19?: $19;
      $20?: $20;
      $21?: $21;
      $22?: $22;
      $23?: $23;
      $24?: $24;
      $25?: $25;
      $26?: $26;
      $27?: $27;
      $28?: $28;
      $29?: $29;
      $30?: $30;
      $31?: $31;
      $32?: $32
    }
  > { '': '' }
}

namespace Nc1e1ffc130aead13aa199b62448b178c_127 {
  type $0 = `${$1 | ''}${$2}${$4}${$6}`;
  type $1 = ``;
  type $2 = $3 | '';
  type $3 = ``;
  type $4 = `` | $5;
  type $5 = ``;
  type $6 = `${$7}${$8 | ''}`;
  type $7 = ``;
  type $8 = $9;
  type $9 = ``;

  export interface I extends Record<
    `/(){,1000}((){,1888})(|())(()(())?){2,3}?/`,
    {
      $0: $0;
      $1?: $1;
      $2: $2;
      $3?: $3;
      $4: $4;
      $5?: $5;
      $6: $6;
      $7: $7;
      $8?: $8;
      $9?: $9
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends Nc1e1ffc130aead13aa199b62448b178c_1.I,
    Nc1e1ffc130aead13aa199b62448b178c_2.I,
    Nc1e1ffc130aead13aa199b62448b178c_3.I,
    Nc1e1ffc130aead13aa199b62448b178c_4.I,
    Nc1e1ffc130aead13aa199b62448b178c_5.I,
    Nc1e1ffc130aead13aa199b62448b178c_6.I,
    Nc1e1ffc130aead13aa199b62448b178c_7.I,
    Nc1e1ffc130aead13aa199b62448b178c_8.I,
    Nc1e1ffc130aead13aa199b62448b178c_9.I,
    Nc1e1ffc130aead13aa199b62448b178c_10.I,
    Nc1e1ffc130aead13aa199b62448b178c_11.I,
    Nc1e1ffc130aead13aa199b62448b178c_12.I,
    Nc1e1ffc130aead13aa199b62448b178c_13.I,
    Nc1e1ffc130aead13aa199b62448b178c_14.I,
    Nc1e1ffc130aead13aa199b62448b178c_15.I,
    Nc1e1ffc130aead13aa199b62448b178c_16.I,
    Nc1e1ffc130aead13aa199b62448b178c_17.I,
    Nc1e1ffc130aead13aa199b62448b178c_18.I,
    Nc1e1ffc130aead13aa199b62448b178c_19.I,
    Nc1e1ffc130aead13aa199b62448b178c_20.I,
    Nc1e1ffc130aead13aa199b62448b178c_21.I,
    Nc1e1ffc130aead13aa199b62448b178c_22.I,
    Nc1e1ffc130aead13aa199b62448b178c_23.I,
    Nc1e1ffc130aead13aa199b62448b178c_24.I,
    Nc1e1ffc130aead13aa199b62448b178c_25.I,
    Nc1e1ffc130aead13aa199b62448b178c_26.I,
    Nc1e1ffc130aead13aa199b62448b178c_27.I,
    Nc1e1ffc130aead13aa199b62448b178c_28.I,
    Nc1e1ffc130aead13aa199b62448b178c_29.I,
    Nc1e1ffc130aead13aa199b62448b178c_30.I,
    Nc1e1ffc130aead13aa199b62448b178c_31.I,
    Nc1e1ffc130aead13aa199b62448b178c_32.I,
    Nc1e1ffc130aead13aa199b62448b178c_33.I,
    Nc1e1ffc130aead13aa199b62448b178c_34.I,
    Nc1e1ffc130aead13aa199b62448b178c_35.I,
    Nc1e1ffc130aead13aa199b62448b178c_36.I,
    Nc1e1ffc130aead13aa199b62448b178c_37.I,
    Nc1e1ffc130aead13aa199b62448b178c_38.I,
    Nc1e1ffc130aead13aa199b62448b178c_39.I,
    Nc1e1ffc130aead13aa199b62448b178c_40.I,
    Nc1e1ffc130aead13aa199b62448b178c_41.I,
    Nc1e1ffc130aead13aa199b62448b178c_42.I,
    Nc1e1ffc130aead13aa199b62448b178c_43.I,
    Nc1e1ffc130aead13aa199b62448b178c_44.I,
    Nc1e1ffc130aead13aa199b62448b178c_45.I,
    Nc1e1ffc130aead13aa199b62448b178c_46.I,
    Nc1e1ffc130aead13aa199b62448b178c_47.I,
    Nc1e1ffc130aead13aa199b62448b178c_48.I,
    Nc1e1ffc130aead13aa199b62448b178c_49.I,
    Nc1e1ffc130aead13aa199b62448b178c_50.I,
    Nc1e1ffc130aead13aa199b62448b178c_51.I,
    Nc1e1ffc130aead13aa199b62448b178c_52.I,
    Nc1e1ffc130aead13aa199b62448b178c_53.I,
    Nc1e1ffc130aead13aa199b62448b178c_54.I,
    Nc1e1ffc130aead13aa199b62448b178c_55.I,
    Nc1e1ffc130aead13aa199b62448b178c_56.I,
    Nc1e1ffc130aead13aa199b62448b178c_57.I,
    Nc1e1ffc130aead13aa199b62448b178c_58.I,
    Nc1e1ffc130aead13aa199b62448b178c_59.I,
    Nc1e1ffc130aead13aa199b62448b178c_60.I,
    Nc1e1ffc130aead13aa199b62448b178c_61.I,
    Nc1e1ffc130aead13aa199b62448b178c_62.I,
    Nc1e1ffc130aead13aa199b62448b178c_63.I,
    Nc1e1ffc130aead13aa199b62448b178c_64.I,
    Nc1e1ffc130aead13aa199b62448b178c_65.I,
    Nc1e1ffc130aead13aa199b62448b178c_66.I,
    Nc1e1ffc130aead13aa199b62448b178c_67.I,
    Nc1e1ffc130aead13aa199b62448b178c_68.I,
    Nc1e1ffc130aead13aa199b62448b178c_69.I,
    Nc1e1ffc130aead13aa199b62448b178c_70.I,
    Nc1e1ffc130aead13aa199b62448b178c_71.I,
    Nc1e1ffc130aead13aa199b62448b178c_72.I,
    Nc1e1ffc130aead13aa199b62448b178c_73.I,
    Nc1e1ffc130aead13aa199b62448b178c_74.I,
    Nc1e1ffc130aead13aa199b62448b178c_75.I,
    Nc1e1ffc130aead13aa199b62448b178c_76.I,
    Nc1e1ffc130aead13aa199b62448b178c_77.I,
    Nc1e1ffc130aead13aa199b62448b178c_78.I,
    Nc1e1ffc130aead13aa199b62448b178c_79.I,
    Nc1e1ffc130aead13aa199b62448b178c_80.I,
    Nc1e1ffc130aead13aa199b62448b178c_81.I,
    Nc1e1ffc130aead13aa199b62448b178c_82.I,
    Nc1e1ffc130aead13aa199b62448b178c_83.I,
    Nc1e1ffc130aead13aa199b62448b178c_84.I,
    Nc1e1ffc130aead13aa199b62448b178c_85.I,
    Nc1e1ffc130aead13aa199b62448b178c_86.I,
    Nc1e1ffc130aead13aa199b62448b178c_87.I,
    Nc1e1ffc130aead13aa199b62448b178c_88.I,
    Nc1e1ffc130aead13aa199b62448b178c_89.I,
    Nc1e1ffc130aead13aa199b62448b178c_90.I,
    Nc1e1ffc130aead13aa199b62448b178c_91.I,
    Nc1e1ffc130aead13aa199b62448b178c_92.I,
    Nc1e1ffc130aead13aa199b62448b178c_93.I,
    Nc1e1ffc130aead13aa199b62448b178c_94.I,
    Nc1e1ffc130aead13aa199b62448b178c_95.I,
    Nc1e1ffc130aead13aa199b62448b178c_96.I,
    Nc1e1ffc130aead13aa199b62448b178c_97.I,
    Nc1e1ffc130aead13aa199b62448b178c_98.I,
    Nc1e1ffc130aead13aa199b62448b178c_99.I,
    Nc1e1ffc130aead13aa199b62448b178c_100.I,
    Nc1e1ffc130aead13aa199b62448b178c_101.I,
    Nc1e1ffc130aead13aa199b62448b178c_102.I,
    Nc1e1ffc130aead13aa199b62448b178c_103.I,
    Nc1e1ffc130aead13aa199b62448b178c_104.I,
    Nc1e1ffc130aead13aa199b62448b178c_105.I,
    Nc1e1ffc130aead13aa199b62448b178c_106.I,
    Nc1e1ffc130aead13aa199b62448b178c_107.I,
    Nc1e1ffc130aead13aa199b62448b178c_108.I,
    Nc1e1ffc130aead13aa199b62448b178c_109.I,
    Nc1e1ffc130aead13aa199b62448b178c_110.I,
    Nc1e1ffc130aead13aa199b62448b178c_111.I,
    Nc1e1ffc130aead13aa199b62448b178c_112.I,
    Nc1e1ffc130aead13aa199b62448b178c_113.I,
    Nc1e1ffc130aead13aa199b62448b178c_114.I,
    Nc1e1ffc130aead13aa199b62448b178c_115.I,
    Nc1e1ffc130aead13aa199b62448b178c_116.I,
    Nc1e1ffc130aead13aa199b62448b178c_117.I,
    Nc1e1ffc130aead13aa199b62448b178c_118.I,
    Nc1e1ffc130aead13aa199b62448b178c_119.I,
    Nc1e1ffc130aead13aa199b62448b178c_120.I,
    Nc1e1ffc130aead13aa199b62448b178c_121.I,
    Nc1e1ffc130aead13aa199b62448b178c_122.I,
    Nc1e1ffc130aead13aa199b62448b178c_123.I,
    Nc1e1ffc130aead13aa199b62448b178c_124.I,
    Nc1e1ffc130aead13aa199b62448b178c_125.I,
    Nc1e1ffc130aead13aa199b62448b178c_126.I,
    Nc1e1ffc130aead13aa199b62448b178c_127.I {
    '': ''
}