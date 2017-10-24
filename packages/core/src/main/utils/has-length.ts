import { curry, Curried2Result } from './curry';

/**
 * hasLength :: Int -> [a] -> Boolean
 *
 * @name hasLength
 * @method
 * @memberof Frampton.Utils
 * @param {Number} len
 * @param {Object} obj
 * @returns {Boolean}
 */
export default curry((len: number, obj: any): boolean => {
  return (
    obj !== undefined &&
    obj !== null &&
    obj.length &&
    obj.length >= len
  );
});