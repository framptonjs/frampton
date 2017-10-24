import { Curried2Result, curry, isFunction } from '@frampton/core';

/**
 * @name matches
 * @method
 * @memberof Frampton.Style
 * @param {String} selector
 * @param {Object} element
 * @returns {Boolean}
 */
export default curry(function matches(selector: string, element: HTMLElement): boolean {
  if (isFunction(element.matches)) {
    return element.matches(selector);

  } else {
    const elementList = document.querySelectorAll(selector);
    let i = 0;

    while (elementList[i] && elementList[i] !== element) {
      i++;
    }

    return (elementList[i] ? true : false);
  }
});
