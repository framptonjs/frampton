import { curry, Curried2Result, isSomething } from '@frampton/core';
import closestToEvent from './closest';


/**
 * selectorContains :: String -> DomEvent -> Boolean
 *
 * Tests if the target of a given event is contained in a node that matches
 * the given selector.
 *
 * @name selectorContains
 * @memberof Frampton.Events
 * @static
 * @param {String} selector
 * @param {Object} evt
 * @returns {Boolean} Is the event contained in a node that matches the given selector
 */
export default curry(function selector_contains(selector: string, evt: Event): boolean {
  return isSomething(closestToEvent(selector, evt));
});