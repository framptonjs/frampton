import { curry, Curried2Result } from '../utils';
import isSomething from '../utils/is-something';
import get from './get';


/**
 * hasProp :: String -> Object -> Boolean
 *
 * @name hasProp
 * @method
 * @memberof Frampton.Utils
 * @param {String} prop
 * @param {Object} obj
 * @returns {Boolean}
 */
export default <Curried2Result<string,any,boolean>>curry(function has_prop(prop: string, obj: any): boolean {
  return isSomething(get(prop, obj));
});
