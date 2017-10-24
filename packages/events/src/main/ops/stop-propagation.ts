import { isFunction, isObject } from '@frampton/core';


export default function(evt: Event): Event {
  if (
    isObject(evt) &&
    isFunction(evt.stopPropagation)
  ) {
    evt.stopPropagation();
  }

  return evt;
}