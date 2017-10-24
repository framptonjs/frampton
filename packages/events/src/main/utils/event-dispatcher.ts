import{ isFunction, isDefined } from '@frampton/core';
import lazy from './lazy';
import { getEventDesc, EVENT_MAP } from '../data/event-map';


// get dom event -> filter -> return stream
function addDomEvent(name: string, node: Node, callback: (evt: Event) => void): void {
  const bubbles: boolean = getEventDesc(name).bubbles;
  node.addEventListener(name, callback, !bubbles);
}


function addCustomEvent<T>(name: string, target: any, callback: (evt: T) => void): void {
  const listen =
    isFunction(target.addEventListener) ?
      target.addEventListener :
        isFunction(target.on) ?
          target.on : null;

  if (listen === null) {
    throw new Error('Event targets must have addEventListener or on method');
  } else {
    listen.call(target, name, callback);
  }
}


function removeDomEvent(name: string, node: Node, callback: (evt: Event) => void) {
  const bubbles: boolean = getEventDesc(name).bubbles;
  node.removeEventListener(name, callback, !bubbles);
}


function removeCustomEvent<T>(name: string, target: any, callback: (evt: T) => void): void {
  const remove =
    isFunction(target.removeEventListener) ?
      target.removeEventListener :
        isFunction(target.off) ?
          target.off : null;

  if (remove === null) {
    throw new Error('Event targets must have removeEventListener or off method');
  } else {
    remove.call(target, name, callback);
  }
}


export function addListener(eventName: string, target: EventTarget, callback: (evt: Event) => void): () => void;
export function addListener<T>(eventName: string, target: any, callback: (evt: T) => void): () => void
export function addListener(eventName: string, target: any, callback: (evt: any) => void): () => void {
  if (isDefined(EVENT_MAP[eventName]) && isFunction(target.addEventListener)) {
    addDomEvent(eventName, target, callback);
  } else {
    addCustomEvent(eventName, target, callback);
  }

  return lazy(removeListener, [ eventName, target, callback ]);
}


export function removeListener(eventName: string, target: EventTarget, callback: (evt: Event) => void): void
export function removeListener<T>(eventName: string, target: any, callback: (evt: T) => void): void
export function removeListener(eventName: string, target: any, callback: (evt: any) => void): void {
  if (isDefined(EVENT_MAP[eventName]) && isFunction(target.removeEventListener)) {
    removeDomEvent(eventName, target, callback);
  } else {
    removeCustomEvent(eventName, target, callback);
  }
};
