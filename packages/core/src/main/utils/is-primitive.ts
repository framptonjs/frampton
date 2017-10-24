import isNumber from './is-number';
import isBoolean from './is-boolean';
import isString from './is-string';

/**
 * Returns true/false is the value a primitive value
 *
 * @name isPrimitive
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_primitive(obj: any): boolean {
  return (
    isNumber(obj) ||
    isBoolean(obj) ||
    isString(obj)
  );
}