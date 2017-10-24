import { curry, compose, Curried2Result } from '@frampton/core';
import { closest } from '@frampton/dom';
import eventTarget from './event-target';


/**
 * closestToEvent :: String -> DomEvent -> DomNode
 *
 * Gets the closest parent to the event target matching the given selector
 *
 * @name closestToEvent
 * @memberof Frampton.Events
 * @static
 * @param {String} selector
 * @param {Object} evt
 * @returns {Object} A DomNode matching the given selector
 */
export default curry(function closest_to_event(selector: string, evt: Event): HTMLElement {
  return compose(closest(selector), eventTarget)(evt);
});
