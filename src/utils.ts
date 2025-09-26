import { StrRegExpFlag } from '../types/model';

export const checkIs4xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 4 === 0;
export const checkIs2xSlashes = (slashes: string | undefined | null) => !!slashes?.length && slashes.length % 2 === 0;

export const flags: Record<StrRegExpFlag, boolean> = {
  d: false,
  g: false,
  i: false,
  m: false,
  s: false,
  u: false,
  y: false,
  v: false,
};
