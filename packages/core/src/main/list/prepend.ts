import { curry, Curried2Result } from '../utils';
import length from './length';

/**
 * @name prepend
 * @method
 * @memberof Frampton.List
 * @param {Array} xs
 * @param {*} obj
 */
export default curry(function prepend<T>(obj: T, xs: Array<T>): Array<T> {
  const newArray: Array<T> = [ obj ];
  const len: number = length(xs);

  for (let i = 0; i < len; i++) {
    newArray.push(xs[i]);
  }

  return newArray;
});
