import { memoize } from './memoize';
import { uriEncode } from './uri-encode';
import { join, split } from '@frampton/core';

export const queryEscape = memoize((str: string): string => {
  return join('+', split('%20', uriEncode(str)));
});