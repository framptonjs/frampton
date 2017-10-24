import { isSomething } from '../utils';


const hasOwnProp = Object.prototype.hasOwnProperty;


function getKeys(obj: any): Array<string> {
  const result: Array<string> = [];

  for (let key in obj) {
    if (hasOwnProp.call(obj, key)) {
      result.push(key);
    }
  }

  return result;
}

/**
 * @name keys
 * @method
 * @memberof Frampton.Object
 * @param {Object} obj Object whose keys to get
 * @returns {String[]}
 */
export default function keys<T extends Object>(obj: T): Array<string> {
  if (isSomething(obj)) {
    if (typeof Object.keys === 'function') {
      return Object.keys(obj).filter((key) => {
        return hasOwnProp.call(obj, key);
      });

    } else {
      return getKeys(obj);
    }
  } else {
    return [];
  }
}