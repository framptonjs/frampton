import { isArray } from '../utils';


/**
 * @name tail
 * @method
 * @memberof Frampton.List
 */
export default function tail<T>(xs: Array<T>): Array<T> {
  switch (xs.length) {
    case 0: return [];
    default: return xs.slice(1);
  }
}
