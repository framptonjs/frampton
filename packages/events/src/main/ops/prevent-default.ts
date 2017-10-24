import { isFunction, isObject } from '@frampton/core';


export default function(evt: Event): Event {
  if (
    isObject(evt) &&
    isFunction(evt.preventDefault) &&
    isFunction(evt.stopPropagation)
  ) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  return evt;
}