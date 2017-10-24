import { curry, Curried2Result } from '../utils';
import contains from './contains';

/**
 * @name diff
 * @method
 * @memberof Frampton.List
 * @returns {Array}
 */
export default curry(<T>(xs: Array<T>, ys: Array<T>): Array<T> => {
  const diff: Array<T> = [];
  const len: number = xs.length;

  for (let i = 0; i < len; i++) {
    const item: T = xs[i];
    if (!contains(ys, item)) {
      diff.push(item);
    }
  }

  return diff;
});
