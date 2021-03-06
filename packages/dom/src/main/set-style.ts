import { Curried3Result, curry } from '@frampton/core';
import supported from './supported';

/**
 * @name setStyle
 * @method
 * @memberof Frampton.Style
 * @param {Object} element - Element to apply style to
 * @param {String} key - Style to update
 * @param {String} value - Value of style
 */
export default curry(function set_style(key: string, value: string, element: HTMLElement): void {
  element.style.setProperty(supported(key), value, '');
});
