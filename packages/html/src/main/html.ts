import { Attribute } from './attributes';
import {
  Html,
  VNode,
  vNode,
  VText,
  vText,
} from './elements';

// EVENTS

export {
  debounce,
  filter,
  map,
} from './events';

// PRIMATIVES

export const text =
  (value: string): VText =>
    vText(value);

export const node =
  <T>(tag: string, attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode(tag, attrs, children);

// SECIONING

export const div =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('div', attrs, children);

export const article =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('article', attrs, children);

export const section =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('section', attrs, children);

export const header =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('header', attrs, children);

export const footer =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('footer', attrs, children);

export const aside =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('aside', attrs, children);

export const nav =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('nav', attrs, children);

export const address =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('address', attrs, children);

// HEADINGS

export const h1 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h1', attrs, children);

export const h2 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h2', attrs, children);

export const h3 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h3', attrs, children);

export const h4 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h4', attrs, children);

export const h5 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h5', attrs, children);

export const h6 =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('h6', attrs, children);

// PHRASING ELEMENTS

export const span =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('span', attrs, children);

export const cite =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('cite', attrs, children);

export const time =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('time', attrs, children);

export const progress =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('progress', attrs, children);

export const code =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('code', attrs, children);

export const pre =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('pre', attrs, children);

export const strong =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('strong', attrs, children);

export const em =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('em', attrs, children);

export const sub =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('sub', attrs, children);

export const sup =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('sup', attrs, children);

// EMBEDED CONTENT

export const iframe =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('iframe', attrs, children);

export const canvas =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('canvas', attrs, children);

export const img =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('img', attrs, []);

export const video =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('video', attrs, children);

export const audio =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('audio', attrs, children);

export const source =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('source', attrs, children);

export const figure =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('figure', attrs, children);

export const figcaption =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('figcaption', attrs, children);

// FORMS

export const form =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('form', attrs, children);

export const legend =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('legend', attrs, children);

export const fieldset =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('fieldset', attrs, children);

export const option =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('option', attrs, children);

export const optgroup =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('optgroup', attrs, children);

export const label =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('label', attrs, children);

export const button =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('button', attrs, children);

export const select =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('select', attrs, children);

export const input =
  <T>(attrs: Array<Attribute<T>>): VNode<T> =>
    vNode('input', attrs, []);

export const textarea =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('textarea', attrs, children);

// LISTS

export const ol =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('ol', attrs, children);

export const ul =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('ul', attrs, children);

export const li =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('li', attrs, children);

// DESCRIPTION LISTS

export const dl =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('dl', attrs, children);

export const dt =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('dt', attrs, children);

export const dd =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('dd', attrs, children);

// TABLES

export const table =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('table', attrs, children);

export const caption =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('caption', attrs, children);

export const tbody =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('tbody', attrs, children);

export const thead =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('thead', attrs, children);

export const tfoot =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('tfoot', attrs, children);

export const col =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('col', attrs, children);

export const colgroup =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('colgroup', attrs, children);

export const th =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('th', attrs, children);

export const tr =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('tr', attrs, children);

export const td =
  <T>(attrs: Array<Attribute<T>>, children: Array<Html<T>>): VNode<T> =>
    vNode('td', attrs, children);
