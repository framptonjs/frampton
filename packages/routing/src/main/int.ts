import { parser, Parser } from './parser';

export const int: Parser<Array<string | number>> = parser(':number');
