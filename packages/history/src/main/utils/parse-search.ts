import memoize from './memoize';
import queryUnescape from './query-unescape';


export interface QueryMap {
  [name: string]: string;
}


function validPair(pair: Array<string>): boolean {
  return (
    (pair.length === 2) &&
    (pair[0] !== '') &&
    (pair[1] !== '')
  );
}


/**
 * Takes a URL query string and returns a hash of key/values
 * @name parseSearch
 * @method
 * @private
 * @memberof Frampton.History
 * @param {String} search Query string to parse
 * @returns {Object}
 */
export default memoize(function parse_search(search: string): QueryMap {
  const obj: QueryMap =
    {};

  const parts: Array<string> =
    search.replace('?', '').split('&');

  const len: number = parts.length;

  for (let i = 0; i < len; i++) {
    const part: string =
      parts[i];

    const pair: Array<string> =
      part.split('=');

    if (validPair(pair)) {
      obj[queryUnescape(pair[0])] = queryUnescape(pair[1]);
    }
  }

  return obj;
});
