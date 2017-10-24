import { Curried2Result, curry, dashToCamel, isSomething } from '@frampton/core';

interface VendorMap {
  [vendor: string]: string;
}

const vendors: VendorMap = {
  webkit: 'webkit',
  Webkit: 'webkit',
  Moz: 'moz',
  ms: 'ms',
  Ms: 'ms',
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @name supportedByElement
 * @method
 * @memberof Frampton.Style
 * @param {Object} element
 * @param {String} prop
 * @returns {String}
 */
export default curry(function supported_by_element(element: HTMLElement, prop: string): string {
  const camelProp: any = dashToCamel(prop);

  if (isSomething(element.style[camelProp])) {
    return prop;
  }

  for (const key in vendors) {
    if (vendors.hasOwnProperty(key)) {
      const propToCheck: any = (key + capitalize(camelProp));
      if (isSomething(element.style[propToCheck])) {
        return ('-' + vendors[key] + '-' + prop).toLowerCase();
      }
    }
  }

  return null;
});
