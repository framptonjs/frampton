import { Curried2Result, curry } from '@frampton/core';

/**
 * @name addClass
 * @method
 * @memberof Frampton.Style
 * @param {Object} element
 * @param {String} name
 */
export default curry(function add_class(name: string, element: HTMLElement): void {
  element.classList.add(name);
});
