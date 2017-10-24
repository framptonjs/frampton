import { curry, Curried3Result } from '../utils';
import length from './length';

/**
 * @name foldl
 * @method
 * @memberof Frampton.List
 */
export default curry(function foldl<A,B>(fn: (acc: B, next: A) => B, acc: B, xs: Array<A>): B {
  const len: number = xs.length;

  for (let i = 0; i < len; i++) {
    acc = fn(acc, xs[i]);
  }

  return acc;
});
