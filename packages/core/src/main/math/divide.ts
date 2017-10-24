import { curry, Curried2Result } from '../utils';

/**
 * @name divide
 * @method
 * @memberof Frampton.Math
 * @param {Number} left
 * @param {Number} right
 * @returns {Number}
 */
export default curry(function divide(left: number, right: number): number {
  return (left / right);
});
