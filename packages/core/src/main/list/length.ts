import { isSomething, isDefined } from '../utils';

/**
 * @name length
 * @method
 * @memberof Frampton.List
 */
export default function length<T>(xs: Array<T>): number {
  return (isSomething(xs) && isDefined(xs.length)) ? xs.length : 0;
}