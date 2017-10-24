/**
 * Returns true/false indicating if object is undefined
 *
 * @name isUndefined
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_undefined(obj: any): boolean {
  return (typeof obj === 'undefined');
}