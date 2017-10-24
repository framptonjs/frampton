import { Curried2Result, curry, isSomething } from '@frampton/core';
import removeStyle from './remove-style';
import setStyle from './set-style';
import { StyleMap } from './types';

/**
 * @name applyStyles
 * @method
 * @memberof Frampton.Style
 * @param {Object} element DomNode to add styles to
 * @param {Object} props   Has of props to add
 */
export default curry(function apply_styles(props: StyleMap, element: HTMLElement): void {
  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      const value: string = props[key];
      if (isSomething(value)) {
        setStyle(key, value, element);
      } else {
        removeStyle(element, key);
      }
    }
  }
});
