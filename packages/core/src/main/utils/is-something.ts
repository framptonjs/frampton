import isNothing from './is-nothing';

/**
 * Returns true/false indicating if object is not null or undefined
 *
 * @name isSomething
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_something(obj: any): boolean {
  return !isNothing(obj);
}