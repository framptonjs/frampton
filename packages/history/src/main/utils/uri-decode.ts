import memoize from './memoize';

export default memoize(function uri_decode(str) {
  return decodeURIComponent(str);
});
