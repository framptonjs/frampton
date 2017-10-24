import { curry, Curried2Result } from './curry';


/**
 * not :: Function -> a -> Boolean
 *
 * @name not
 * @method
 * @memberof Frampton.Utils
 * @param {Function} fn
 * @returns {Boolean}
 */
export default curry(<T>(fn: (val: T) => boolean, arg: T): boolean => {
  return !(fn(arg));
});
