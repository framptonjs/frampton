import { AttrType } from './AttrType';
import { ClassAttribute } from './classes';
import { StyleAttribute } from './style';
import { DataAttribute } from './data';
import { Property } from './props';
import { AttributeType } from './attrs';
import { EventAttribute } from './events';
import * as PropertyStatic from './props';


export * from './attrs';
export * from './AttrType';
export * from './classes';
export * from './style';
export * from './data';
export { ClassAttribute } from './classes';
export { StyleAttribute } from './style';
export { DataAttribute } from './data';
export { Property } from './props';
export { AttributeType } from './attrs';
export { EventAttribute } from './events';


export type Attribute<T> =
  ClassAttribute |
  Property |
  StyleAttribute |
  DataAttribute |
  AttributeType |
  EventAttribute<T>;


export interface Attributes<T> {
  [name: string]: Attribute<T>;
}


export function organizeAttributes<T>(attrs: Array<Attribute<T>>): Attributes<T> {
  const processed: Attributes<T> = {};
  const len: number = attrs.length;

  for (let i = 0; i < len; i++) {
    const attr: Attribute<T> = attrs[i];

    switch (attr.type) {
      case AttrType.CLASS_LIST:
        processed['classList'] = attr;
        break;

      case AttrType.STYLE:
        processed['style'] = attr;
        break;

      case AttrType.DATA:
        processed['data'] = attr;
        break;

      case AttrType.PROPERTY:
        processed[attr.name] = attr;
        break;

      case AttrType.ATTRIBUTE:
        processed[attr.name] = attr;
        break;

      case AttrType.EVENT:
        processed[`event-${attr.value.name}-${i}`] = attr;
        break;
    }
  }

  return processed;
}