import { curry, compose, Curried2Result } from '@frampton/core';
import { elementContains } from './html';
import eventTarget from './event-target';


/**
 * contains :: DomNode -> DomEvent -> Boolean
 *
 * @name contains
 * @memberof Frampton.Events
 * @static
 * @param {Object} element
 * @param {Object} evt
 * @returns {Boolean}
 */
export default curry(function curried_contains(element: Node, evt: Event): boolean {
  return compose(elementContains(element), eventTarget)(evt);
});