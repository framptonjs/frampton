import { memoize } from './memoize';

export default memoize(function uri_encode(str: string): string {
  return encodeURIComponent(str);
});