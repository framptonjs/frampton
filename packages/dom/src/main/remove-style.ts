import { Curried2Result, curry } from '@frampton/core';
import supported from './supported';

/**
 * @name removeStyle
 * @method
 * @memberof Frampton.Style
 * @param {Object} element
 * @param {String} key
 */
export default curry(function remove_style(element: HTMLElement, key: string): void {
  element.style.removeProperty(supported(key));
});
