import { curry, Curried3Result } from '../utils';
import isString from '../utils/is-string';
import getKeys from './keys';


function setValue(prop: string, value: any, oldObj: any, newObj: any) {
  if (!isString(prop)) {
    throw new Error('Property to set must be a string');

  } else {
    const [ head, ...tail ] = (prop || '').split('.').filter((val) => {
      return val.trim() !== '';
    });

    const keys: Array<string> = getKeys(oldObj);

    if (keys.indexOf(head) === -1) {
      keys.push(head);
    }

    for (let i = 0; i < keys.length; i++) {
      const key: string = keys[i];

      if (key === head) {
        if (tail.length > 0) {
          const nextObj = oldObj[key] || {};
          newObj[key] = setValue(tail.join('.'), value, nextObj, {});
        } else {
          newObj[key] = value;
        }

      } else {
        newObj[key] = oldObj[key];
      }
    }
  }

  return newObj;
}


/**
 * set :: String -> Any -> Object -> Object
 *
 * @name set
 * @method
 * @memberof Frampton.Object
 * @param {String} key The key to update
 * @param {*} value The value to update to
 * @param {Object} obj The object to update
 * @returns {Object}
 */
export default <Curried3Result<string,any,any,any>>curry(function set(prop: string, value: any, obj: any): any {
  return setValue(prop, value, obj, {});
});
