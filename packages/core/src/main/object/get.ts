import { curry, Curried2Result} from '../utils';
import isNothing from '../utils/is-nothing';
import isPrimitive from '../utils/is-primitive';


/**
 * get :: String -> Object -> Any
 *
 * @name get
 * @method
 * @memberof Frampton.Object
 * @param {String} prop
 * @param {Object} obj
 * @returns {*}
 */
export default <Curried2Result<string, any, any>>curry(function get<T>(prop: string, obj: any): T {
  if (isPrimitive(obj) || isNothing(obj)) {
    return null;

  } else {
    const parts = (prop || '').split('.').filter((val) => {
      return val.trim() !== '';
    });

    if (parts.length > 1) {
      const [ head, ...tail ] = parts;
      const sub: any = obj[head];

      return (
        !isPrimitive(sub) ?
          get<T>(tail.join('.'), sub) :
          null
      );
    } else {
      return (obj[parts[0]] || null);
    }
  }
});
