import { memoize } from './memoize';

export const uriEncode = memoize((str: string): string => {
  return encodeURIComponent(str);
});