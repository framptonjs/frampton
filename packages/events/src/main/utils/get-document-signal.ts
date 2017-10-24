import { Signal } from '@frampton/core';
import documentCache from './document-cache';
import getEventSignal from './get-event-signal';


/**
 * @name getDocumentSignal
 * @memberof Frampton.Events
 * @static
 * @private
 * @param {String} name Event name to look up
 * @returns {Frampton.Data.Signal}
 */
export default function get_document_signal(eventName: string): Signal<Event> {
  return documentCache(eventName, () => {
    return getEventSignal<Event>(eventName, document.documentElement);
  });
}