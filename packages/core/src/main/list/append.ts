import { curry, Curried2Result } from '../utils';

/**
 * @name append
 * @method
 * @memberof Frampton.List
 * @param {Array} xs
 * @param {*} obj
 * @returns {Array}
 */
export default curry(<T>(xs: Array<T>, obj: T): Array<T> => [ ...xs, obj ]);
