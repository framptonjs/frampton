import { Maybe } from '@frampton/core';
import { Parser } from './parser';

// match : [ Parser ] -> String -> Maybe a
function match<T>(parsers: Array<Parser<T>>, path: string): Maybe<T> {
  const [ parser, ...tail ] = parsers;
  return parser(path).fork(
    (val: T) => Maybe.just(val),
    () => {
      if (parsers.length > 1) {
        return match(tail, path);
      } else {
        return Maybe.nothing();
      }
    },
  );
}

// oneOf : [ Parser ] -> Parser
export function oneOf<T>(parsers: Array<Parser<T>>): Parser<T> {
  return (path: string): Maybe<T> => match<T>(parsers, path);
}
