import {
  Maybe,
  isNumeric,
} from '@frampton/core'

import { isIndex } from './is-index';

export function match(formatParts: Array<string>, pathParts: Array<string>): Maybe<Array<string | number>> {
  const pathLen = pathParts.length;
  const formatLen = formatParts.length;
  const tokens: Array<string | number> = [];

  if (pathLen < formatLen) {
    return Maybe.nothing();
  }

  for (let i = 0; i < pathLen; i++) {
    const path = pathParts[i];
    const format = formatParts[i];
    if (format !== undefined) {
      if (format === ':number' && isNumeric(path)) {
        tokens.push(parseInt(path));
      } else if (format === ':string' && !isNumeric(path)) {
        tokens.push(path);
      } else if (format !== path) {
        return Maybe.nothing();
      }
    } else {
      if (isIndex(pathParts[i])) {
        return Maybe.just(tokens);
      } else {
        return Maybe.nothing();
      }
    }
  }

  return Maybe.just(tokens);
};
