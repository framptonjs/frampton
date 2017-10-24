const hasOwnProp = Object.prototype.hasOwnProperty;


/**
 * @name values
 * @method
 * @memberof Frampton.Object
 * @param {Object} obj Object whose values to get
 * @returns {Array<any>}
 */
export default function values<T>(obj: any): Array<T> {
  const result: Array<T> = [];

  for (let key in obj) {
    if (hasOwnProp.call(obj, key)) {
      result.push(obj[key]);
    }
  }

  return result;
}
