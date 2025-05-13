import { regExpertVitePlugin } from '../types/model';

export type Options = Parameters<typeof regExpertVitePlugin>[0];

export type GroupInfo = {
  isRoot: boolean;
  isOpt: boolean;
  isOptAsChild: boolean;
  isOptChildren: boolean;
  groupStr: string;
  groupSymbol: GroupStubSymbol;
  content: string;
  key: string;
  name: GroupName;
  topName: GroupName | null;
  isNumName: boolean;
  parent: GroupInfo | null;
  isNever: boolean;
  isHasSubTypes: boolean;
  isCountable: boolean;
};

export const enum GroupStubSymbol {
  zero = '****',
}

export const enum GroupName {
  empty = '',
  zero = '$0',
  other = '{OTHER NAME}',
}
