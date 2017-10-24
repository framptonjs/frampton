import { Curried2Result, curry } from '@frampton/core';
import matches from './matches';

/**
 * Searches inside the given element and returns true if the given element, or
 * one of its children matches the given selector, false otherwise.
 *
 * @name elementContainsSelector
 * @method
 * @memberof Frampton.Style
 * @param {String} selector Selector to search for
 * @param {Object} element  DomNode to search inside of
 * @returns {Boolean} Is there a match for the selector?
 */
export default curry((selector: string, element: HTMLElement): boolean => {
  return (
    matches(selector, element) ||
    element.querySelectorAll(selector).length > 0
  );
});
