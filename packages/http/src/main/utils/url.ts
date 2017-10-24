import { curry, Curried2Result } from '@frampton/core';
import queryString from './query-string';

/**
 * url_builder :: String -> Object -> String
 *
 * @name url
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} domain
 * @param {Object} args
 * @returns {String}
 */
export default curry(function url_builder(domain: string, args: Array<string>): string {
  if (!args) return domain;
  return domain + '?' + queryString(args);
});