import { Maybe } from '@frampton/core';
import { match, splitPath } from './utils';

export type Parser<T> = (str: string) => Maybe<T>;

// parser : String -> ( String -> Maybe a )
export function parser(format: string): Parser<Array<string | number>> {
  const formatParts: Array<string> = splitPath(format);

  return (path: string): Maybe<Array<string | number>> => {
    const pathParts: Array<string> = splitPath(path);
    return match(formatParts, pathParts);
  };
}
