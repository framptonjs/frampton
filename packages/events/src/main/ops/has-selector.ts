import { curry, compose, Curried2Result } from '@frampton/core';
import { matches } from '@frampton/dom';
import eventTarget from './event-target';


/**
 * hasSelector :: String -> DomEvent -> Boolean
 *
 * @name hasSelector
 * @memberof Frampton.Events
 * @static
 * @param {String} selector
 * @param {Object} evt
 * @returns {Boolean}
 */
export default curry(function has_selector(selector: string, evt: Event): boolean {
  return compose(matches(selector), eventTarget)(evt);
});