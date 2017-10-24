import { Signal } from '@frampton/core';
import { getEventSignal } from '../utils';


/**
 * onCustom<T> :: String -> any -> Signal T
 *
 * @name onCustom
 * @memberof Frampton.Events
 * @static
 * @param {String} eventName Name of event to listen for
 * @param {Object} target    Object on which to listen for event
 * @returns {Frampton.Data.Signal} A Signal of all occurances of the given event on the given object
 */
export default function onCustom<T>(eventName: string, target: any): Signal<T> {
  return getEventSignal<T>(eventName, target);
}