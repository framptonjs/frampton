import { curry, Curried2Result } from '../utils';

/**
 * @name multiply
 * @method
 * @memberof Frampton.Math
 * @param {Number} left
 * @param {Number} right
 * @returns {Number}
 */
export default curry(function multiply(left: number, right: number): number {
  return left * right;
});
