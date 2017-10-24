import {
  join,
  split,
} from '@frampton/core'

import { memoize } from './memoize';
import uriDecode from './uri-decode';

export default memoize(function query_unescape(str: string): string {
  return join(' ', split('+', uriDecode(str)));
});