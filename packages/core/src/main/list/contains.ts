import { curry, Curried2Result } from '../utils';


/**
 * @name contains
 * @method
 * @memberof Frampton.List
 * @param {Array} xs
 * @param {*}   obj
 * @returns {Boolean}
 */
export default curry(<T>(xs: Array<T>, obj: any): boolean => {
  return (xs.indexOf(obj) > -1);
});
