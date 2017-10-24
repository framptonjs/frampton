import isUndefined from './is-undefined';
import isNull from './is-null';

/**
 * Returns true/false is the object null or undefined
 *
 * @name isNothing
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_nothing(obj: any): boolean {
  return (isUndefined(obj) || isNull(obj));
}