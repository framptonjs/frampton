import { AttrType } from '../attributes/AttrType';
import {
  Attributes,
  Attribute,
  ClassAttribute,
  StyleAttribute,
  EventAttribute,
  AttributeType,
  Property
} from '../attributes';
import { diffClasses } from './diff-classes';
import { diffStyles } from './diff-styles';
import { diffEvent } from './diff-event';


function diffProperty(oldProp: Property, newProp: Property): Property {
  if (newProp === undefined) {
    return {
      type: AttrType.PROPERTY,
      name: oldProp.name,
      value: undefined
    };
  } else if (oldProp.value !== newProp.value) {
    return {
      type: AttrType.PROPERTY,
      name: newProp.name,
      value: newProp.value
    }
  }
}


function diffAttribute(oldAttr: AttributeType, newAttr: AttributeType): AttributeType {
  if (newAttr === undefined) {
    return {
      type: AttrType.ATTRIBUTE,
      name: oldAttr.name,
      value: undefined
    };
  } else if (oldAttr.value !== newAttr.value) {
    return {
      type: AttrType.ATTRIBUTE,
      name: newAttr.name,
      value: newAttr.value
    }
  }
}


export function diffProps<T>(oldAttrs: Attributes<T>, newAttrs: Attributes<T>): Attributes<T> {

  let diff: Attributes<T> = null;

  for (let key in oldAttrs) {
    const oldAttr: Attribute<T> = oldAttrs[key];
    const newAttr: Attribute<T> = newAttrs[key];

    switch (oldAttr.type) {
      case AttrType.ATTRIBUTE: {
        const attrDiff = diffAttribute(oldAttr, (<AttributeType>newAttr));
        if (attrDiff !== undefined) {
          diff = (diff || {});
          diff[key] = attrDiff;
        }
        break;
      }

      case AttrType.PROPERTY: {
        const propDiff = diffProperty(oldAttr, (<Property>newAttr));
        if (propDiff !== undefined) {
          diff = (diff || {});
          diff[key] = propDiff;
        }
        break;
      }

      case AttrType.CLASS_LIST: {
        const classDiff = diffClasses(oldAttr, (<ClassAttribute>newAttr));
        if (classDiff !== undefined) {
          diff = (diff || {});
          diff[key] = classDiff;
        }
        break;
      }

      case AttrType.EVENT: {
        const eventDiff = diffEvent(oldAttr, (<EventAttribute<T>>newAttr));
        if (eventDiff !== undefined) {
          diff = (diff || {});
          diff[key] = eventDiff;
        }
        break;
      }

      case AttrType.STYLE: {
        const styleDiff = diffStyles(oldAttr, (<StyleAttribute>newAttr));
        if (styleDiff !== undefined) {
          diff = (diff || {});
          diff[key] = styleDiff;
        }
        break;
      }
    }
  }

  for (let key in newAttrs) {
    if (oldAttrs[key] === undefined) {
      diff = (diff || {});
      diff[key] = newAttrs[key];
    }
  }

  return diff;
}
