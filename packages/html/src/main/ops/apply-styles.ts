import { StyleMap } from '../attributes/style';


export function applyStyles(element: HTMLElement, styleMap: StyleMap): void {
  for (let key in styleMap) {
    const value: string = styleMap[key];

    if (value === undefined) {
      element.style.removeProperty(key);
    } else {
      element.style.setProperty(key, value);
    }
  }
}