import { Curried2Result, curry, Maybe } from '@frampton/core';
import { Parser } from './parser';

export type ParserMapping<A, B> = (...args: Array<A>) => B;

// map : mapping -> parser -> parser
export const map = curry(<A, B>(mapping: ParserMapping<A, B>, parser: Parser<Array<A>>) => {
  return (path: string): Maybe<B> =>
    parser(path).map((match: Array<A>) => mapping(...match));
});
