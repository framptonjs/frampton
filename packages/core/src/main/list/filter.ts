import { curry, Curried2Result } from '../utils';
import length from './length';

/**
 * @name filter
 * @method
 * @memberof Frampton.List
 * @param {Function} predicate
 * @param {Array} xs
 * @returns {Array} A new array
 */
export default curry(function filter<T>(predicate: (val: T) => boolean, xs: Array<T>): Array<T> {
  const len: number = length(xs);
  const newList: Array<T> = [];

  for (let i = 0; i < len; i++) {
    if (predicate(xs[i])) {
      newList.push(xs[i]);
    }
  }

  return newList;
});
