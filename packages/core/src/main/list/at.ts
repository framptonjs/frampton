import { curry, Curried2Result } from '../utils';
import isDefined from '../utils/is-defined';

/**
 * @name at
 * @method
 * @memberof Frampton.List
 */
export default curry(<T>(index: number, xs: Array<T>): T => {
  return isDefined(xs[index]) ? xs[index] : null;
});
