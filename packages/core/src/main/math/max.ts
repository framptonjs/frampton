import { curry, Curried2Result } from '../utils';

/**
 * @name max
 * @method
 * @memberof Frampton.Math
 * @param {Number} left - First number to test
 * @param {Number} right - Second number to test
 * @returns {Number} The larger of the two numbers
 */
export default curry(function max(left: number, right: number): number {
  return (left > right) ? left : right;
});
