import { curry, Curried2Result } from '../utils';

/**
 * @name add
 * @method
 * @memberof Frampton.Math
 * @param {Number} left
 * @param {Number} right
 * @returns {Number}
 */
export default curry(function add(left: number, right: number): number {
  return (left + right);
});
