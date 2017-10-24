import { Logging } from '@frampton/core';
import supported from './supported';
import { StyleMap } from './types';

/**
 * @name supportedProps
 * @method
 * @memberof Frampton.Style
 * @param {Object} props
 * @returns {Object}
 */
export default function supported_props(props: StyleMap): StyleMap {
  const obj: StyleMap = {};
  let temp: any = null;

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      temp = supported(key);
      if (temp) {
        obj[temp] = props[key];
      } else {
        Logging.warn('style prop ' + key  + ' is not supported by this browser');
      }
    }
  }

  return obj;
}
