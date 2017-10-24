import { curry, Curried2Result } from '../utils';


/**
 * join :: String -> Array String -> String
 * @name join
 * @method
 * @memberof Frampton.String
 * @param {String} sep
 * @param {Array} strs
 * @returns {String}
 */
export default curry(function join(sep: string, strs: Array<string>): string {
  return strs.join(sep);
});