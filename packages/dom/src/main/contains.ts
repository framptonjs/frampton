import { Curried2Result, curry, isFunction } from '@frampton/core';

// Does the given parent contain the given child
export default curry((parent: HTMLElement, child: HTMLElement): boolean => {
  if (parent === child) {
    return true;
  } else if (isFunction(parent.contains)) {
    return parent.contains(child);
  } else {
    while (child !== null && child !== undefined) {
      if (parent === child) {
        return true;
      }
      child = (child.parentNode as HTMLElement);
    }
    return false;
  }
});
