import { curry, isFunction, Curried2Result } from '@frampton/core';

// contains :: Dom -> Dom -> Boolean
export default curry((parent: Node, child: Node): boolean => {
  if (parent === child) {
    return true;

  } else if (isFunction(parent.contains)) {
    return parent.contains(child);

  } else {
    while (child = child.parentNode) {
      if (parent === child) {
        return true;
      } else {
        return false;
      }
    }
  }
});