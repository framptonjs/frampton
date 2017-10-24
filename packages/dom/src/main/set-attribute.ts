import { Curried3Result, curry } from '@frampton/core';

export default curry((name: string, value: string, element: HTMLElement): void => {
  element.setAttribute(name, value);
});
