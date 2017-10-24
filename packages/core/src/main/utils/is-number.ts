/**
 * Returns true/false is the object a number
 *
 * @name isNumber
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_number(obj: any): boolean {
  return (typeof obj === 'number');
}