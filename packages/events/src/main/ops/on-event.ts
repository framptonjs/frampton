import { isNothing, Signal } from '@frampton/core';
import contains from './contains';
import { getDocumentSignal } from '../utils';


/**
 * onEvent :: String -> Dom -> Signal Event
 *
 * @name onEvent
 * @memberof Frampton.Events
 * @static
 * @param {String} eventName Name of event to listen for
 * @param {Object} target    Object on which to listen for event
 * @returns {Frampton.Data.Signal} A Signal of all occurances of the given event on the given object
 */
export default function onEvent(eventName: string, target?: HTMLElement): Signal<Event> {
  if (isNothing(target)) {
    return getDocumentSignal(eventName);
  } else {
    return getDocumentSignal(eventName).filter(contains(target));
  }
}