import { Curried2Result, curry } from '@frampton/core';
import supported from './supported';

/**
 * current :: DomNode -> String -> String
 *
 * @name currentValue
 * @method
 * @memberof Frampton.Style
 * @param {Object} element DomNode whose property to check
 * @param {String} prop    Name of property to check
 * @returns {String} String representation of current property value
 */
export default curry(function current_value(prop: string, element: HTMLElement): string {
  if (window !== undefined) {
    return window.getComputedStyle(element).getPropertyValue(supported(prop));
  } else {
    return null;
  }
});
