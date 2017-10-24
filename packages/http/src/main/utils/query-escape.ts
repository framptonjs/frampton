import { memoize } from './memoize';
import uriEncode from './uri-encode';
import { join, split } from '@frampton/core';

export default memoize(function query_escape(str: string): string {
  return join('+', split('%20', uriEncode(str)));
});