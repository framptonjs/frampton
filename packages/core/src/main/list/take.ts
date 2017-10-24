import { curry, Curried2Result } from '../utils';
import { min } from '../math';

export default curry(function take<T>(num: number, xs: Array<T>): Array<T> {
  const newList = [];
  const len = min(xs.length, num);

  for (let i = 0; i < len; i++) {
    newList.push(xs[i]);
  }

  return newList;
});
