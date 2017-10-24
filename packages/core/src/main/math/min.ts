import { curry, Curried2Result } from '../utils';

/**
 * @name min
 * @method
 * @memberof Frampton.Math
 * @param {Number} left - First number to test
 * @param {Number} right - Second number to test
 * @returns {Number} The smaller of the two numbers
 */
export default curry(function min(left: number, right: number): number {
  return (left < right) ? left : right;
});
