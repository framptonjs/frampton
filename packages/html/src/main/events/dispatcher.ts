import { Signal } from '@frampton/core';
import { onEvent } from '@frampton/events';
import { DomEventDef, EventMessenger } from '../attributes/events';


declare global {
  interface Node {
    __fr_event_handlers: ElementEventMap;
  }
}


export interface ElementEventMap {
  [name: string]: EventDescription;
}


export interface EventDescription {
  name: string;
  signal: Signal<Event>;
}


function removeEventByName(node: Node, name: string): void {
  const eventMap: ElementEventMap =
    node.__fr_event_handlers;

  if (eventMap !== undefined) {
    const eventDescription: EventDescription =
      eventMap[name];

    if (eventDescription !== undefined) {
      const handler: Signal<Event> =
        eventDescription.signal;

      handler.close();

      eventMap[name] = undefined;
    }
  }
}


export function removeAllEvents(node: Node): void {
  const eventMap: ElementEventMap =
    node.__fr_event_handlers;

  const childNodes: NodeList =
    node.childNodes;

  const len: number =
    childNodes.length;

  for (let i = 0; i < len; i++) {
    removeAllEvents(childNodes[i]);
  }

  if (eventMap !== undefined) {
    for (let key in eventMap) {
      removeEventByName(node, key);
    }
  }
}


export function removeEvent<T>(element: HTMLElement, name: string): void {
  removeEventByName(element, name);
}


export function addEvent<T>(element: HTMLElement, name: string, event: DomEventDef<T>, callback: (evt: Event) => void): void {
  if (element.__fr_event_handlers === undefined) {
    element.__fr_event_handlers = {};
  }

  const eventName: string =
    event.name;

  // Remove previous handlers for this event
  removeEventByName(element, name);

  const parentSignal: Signal<Event> =
    onEvent(eventName, element);

  const eventDescription: EventDescription = {
    name: eventName,
    signal: parentSignal
  };

  parentSignal.onNext(callback);

  element.__fr_event_handlers[name] =
    eventDescription;
}