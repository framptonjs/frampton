import { curry, Curried3Result } from '../utils';

/**
 * replace :: String -> String -> String -> String
 * @name replace
 * @method
 * @memberof Frampton.String
 * @param {String} newSubStr
 * @param {String} oldSubStr
 * @param {String} str
 * @returns {String}
 */
export default curry(function replace(newSubStr: string, oldSubStr: string, str: string): string {
  return str.replace(oldSubStr, newSubStr);
});