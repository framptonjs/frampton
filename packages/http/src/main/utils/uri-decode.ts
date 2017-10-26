import { memoize } from './memoize';

export const uriDecode = memoize((str: string): string => {
  return decodeURIComponent(str);
});