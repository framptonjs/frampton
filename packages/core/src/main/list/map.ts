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
export default curry(function filter<A,B>(mapping: (val: A) => B, xs: Array<A>): Array<B> {
  const len: number = length(xs);
  const newList: Array<B> = [];

  for (let i = 0; i < len; i++) {
    newList.push(mapping(xs[i]));
  }

  return newList;
});
