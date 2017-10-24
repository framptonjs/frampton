import { curry, Curried2Result } from '../utils';
import contains from './contains';
import append from './append';


/**
 * @name addToList
 * @method
 * @memberof Frampton.List
 * @param {Array} xs  Array to add object to
 * @param {*}   obj Object to add to array
 * @returns {Array} A new array with the object added
 */
export default curry(<T>(xs: Array<T>, obj: T): Array<T> => {
  return <Array<T>>(
    (!contains(xs, obj)) ?
      append(xs, obj) :
      xs
  );
});
