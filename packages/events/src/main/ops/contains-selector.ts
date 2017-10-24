import { curry, compose, Curried2Result } from '@frampton/core';
import { containsSelector } from '@frampton/dom';
import eventTarget from './event-target';


/**
 * containsSelector :: String -> DomEvent -> Boolean
 *
 * Does the target of the given event object contain an object with the
 * given selector?
 *
 * @name containsSelector
 * @static
 * @memberof Frampton.Events
 * @param {String} selector - A selector to test
 * @param {Object} evt - An event object whose target will be tested against
 * @returns {Boolean} Does the event target, or one of its children, have the given selector
 */
export default curry(function contains_selector(selector: string, evt: Event): boolean {
  return compose(containsSelector(selector), eventTarget)(evt);
});
