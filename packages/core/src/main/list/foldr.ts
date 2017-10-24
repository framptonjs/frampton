import { curry, Curried3Result } from '../utils';
import length from './length';

/**
 * @name foldr
 * @method
 * @memberof Frampton.List
 */
export default curry(function foldr<A,B>(fn: (acc: B, next: A) => B, acc: B, xs: Array<A>): B {
  var len: number = length(xs);

  while (len--) {
    acc = fn(acc, xs[len]);
  }

  return acc;
});
