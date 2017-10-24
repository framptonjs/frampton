import { memoize } from './memoize';

export default memoize(function uri_decode(str: string): string {
  return decodeURIComponent(str);
});