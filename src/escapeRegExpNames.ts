import { escapeRegExpNamesMaker } from './escapeRegExpNames.maker';
import { checkIs2xSlashes } from './utils';

export const escapeRegExpNames = escapeRegExpNamesMaker(checkIs2xSlashes, 1);
