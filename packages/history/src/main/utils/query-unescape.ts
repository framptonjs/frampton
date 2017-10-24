import { join, split } from '@frampton/core';
import uriDecode from './uri-decode';
import memoize from './memoize';

export default memoize(function query_unescape(str: string): string {
  return join(' ', split('+', uriDecode(str)));
});
