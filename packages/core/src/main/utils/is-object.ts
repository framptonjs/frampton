import isSomething from './is-something';
import isArray from './is-array';

/**
 * Returns true/false is the object a regular Object
 *
 * @name isObject
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function isObject(obj: any): boolean {
  return (isSomething(obj) && !isArray(obj) && typeof obj === 'object');
}