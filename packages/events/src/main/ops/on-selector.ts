import { Signal, isSomething } from '@frampton/core';
import closestToEvent from './closest';
import selectorContains from './selector-contains';
import getDocumentSignal from '../utils/get-document-signal';
import selectorCache from '../utils/selector-cache';


function mouseEnterSelector(selector: string) {
  var previousElement: Node = null;

  return getDocumentSignal('mouseover').filter((evt: Event) => {
    const current: Node =
      closestToEvent(selector, evt);

    if (isSomething(current) && current !== previousElement) {
      previousElement = current;
      return true;

    } else {
      return false;
    }
  });
}


function mouseLeaveSelector(selector: string) {
  var previousElement: Node = null;

  return getDocumentSignal('mouseleave').filter((evt: Event) => {
    const current: Node =
      closestToEvent(selector, evt);

    if (isSomething(current) && current !== previousElement) {
      previousElement = current;
      return true;

    } else if (isSomething(current)) {
      previousElement = current;
      return false;

    } else {
      return false;
    }
  });
}


/**
 * onSelector :: String -> String -> Signal Event
 *
 * @name onSelector
 * @memberof Frampton.Events
 * @static
 * @param {String} eventName Name of event to listen for
 * @param {String} selector  Selector to filter events by
 * @returns {Frampton.Data.Signal} A Signal of all occurances of the given event within given selector
 */
export default function onSelector(eventName: string, selector: string): Signal<Event> {
  if (typeof selector === 'string' && typeof eventName === 'string') {
    return selectorCache((eventName + ' | ' + selector), () => {
      if (eventName === 'mouseenter') {
        return mouseEnterSelector(selector);

      } else if (eventName === 'mouseleave') {
        return mouseLeaveSelector(selector);

      } else {
        return getDocumentSignal(eventName).filter((evt) => {
          return selectorContains(selector, evt);
        });
      }
    });
  } else {
    throw new Error(`Frampton.Events.onSelector given unexpected arguments name: ${eventName}, selector: ${selector}`);
  }
}