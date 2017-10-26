import {
  join,
  split,
} from '@frampton/core'

import { memoize } from './memoize';
import { uriDecode } from './uri-decode';

export const queryUnescape = memoize((str: string): string => {
  return join(' ', split('+', uriDecode(str)));
});