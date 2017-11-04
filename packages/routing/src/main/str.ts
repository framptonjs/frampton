import { parser, Parser } from './parser';

export const str: Parser<Array<string | number>> = parser(':string');
