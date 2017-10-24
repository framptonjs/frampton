import { DataMap, AttrType, Attribute, Attributes } from '../attributes';
import { applyEvent } from './apply-event';
import { applyStyles } from './apply-styles';
import { applyClasses } from './apply-classes';
import { Runtime } from '../runtime';


function applyAttribute(element: HTMLElement, key: string, value: string|boolean): void {
  if (value === true) {
    element.setAttribute(key, '');
  } else if (value === false || value === undefined) {
    element.removeAttribute(key);
  } else {
    element.setAttribute(key, value);
  }
}


function applyData(element: HTMLElement, data: DataMap): void {
  for (let prop in data) {
    const key: string = 'data-' + prop;
    applyAttribute(element, key, data[prop]);
  }
}


export function applyAttr<T>(element: HTMLElement, key: string, attr: Attribute<T>, runtime: Runtime<T>): void {
  switch (attr.type) {
    case AttrType.ATTRIBUTE:
      applyAttribute(element, key, attr.value);
      break;

    case AttrType.PROPERTY:
      if (key === 'value' && ((<HTMLInputElement>element).type === 'text' || (<HTMLInputElement>element).type === 'textarea')) {
        const cursor: number = (<HTMLInputElement>element).selectionStart;
        (<any>element)[key] = attr.value;
        (<HTMLInputElement>element).selectionStart = cursor;
        (<HTMLInputElement>element).selectionEnd = cursor;

      } else {
        (<any>element)[key] = attr.value;
      }
      
      break;

    case AttrType.DATA:
      applyData(element, attr.value);
      break;

    case AttrType.STYLE:
      applyStyles(element, attr.value);
      break;

    case AttrType.CLASS_LIST:
      applyClasses(element, attr.value);
      break;

    case AttrType.EVENT:
      applyEvent(element, key, attr, runtime);
      break;

    default:
      const _exhaustiveCheck: never = attr;
      throw new Error(`Non-exhaustive pattern match for attribute: ${_exhaustiveCheck}`);
  }
}


export function applyAttrs<T>(element: HTMLElement, attrs: Attributes<T>, runtime: Runtime<T>): void {
  for (let key in attrs) {
    applyAttr(element, key, attrs[key], runtime);
  }
}
