import curry from 'frampton-utils/curry';
import queryString from 'frampton-io/http/utils/query_string';

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
export default curry(function url_builder(domain, args) {
  if (!args) return domain;
  return domain + '?' + queryString(args);
});