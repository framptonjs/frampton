import { curry, Curried2Result } from '../utils';


/**
 * split :: Number -> List a -> (List a, List a)
 *
 * @name split
 * @method
 * @memberof Frampton.List
 */
export default curry(function split<T>(n: number, xs: Array<T>): [Array<T>, Array<T>] {
  const ys: Array<T> = [];
  const zs: Array<T> = [];
  const len = xs.length;

  for (let i = 0; i < len; i++) {
    if (i < n) {
      ys.push(xs[i]);
    } else {
      zs.push(xs[i]);
    }
  }

  return [ ys, zs ];
});
