import { curry, Curried2Result } from '../utils';

/**
 * @name modulo
 * @method
 * @memberof Frampton.Math
 * @param {Number} left
 * @param {Number} right
 * @returns {Number}
 */
export default curry(function modulo(left: number, right: number): number {
  return left % right;
});
