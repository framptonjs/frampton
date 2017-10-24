import isNothing from './is-nothing';

/**
 * Returns a boolean telling us if a given value doesn't exist or has length 0
 *
 * @name isEmpty
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_empty(obj: any): boolean {
  if (typeof obj === 'string') {
    return obj.trim().length === 0;
  } else {
    return (
      isNothing(obj) ||
      !obj.length ||
      obj.length === 0
    );
  }
}