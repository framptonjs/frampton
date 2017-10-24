import { Curried2Result, curry } from '@frampton/core';

export default curry((html: string, element: HTMLElement): void => {
  if (element) {
    element.innerHTML = html;
  }
});
