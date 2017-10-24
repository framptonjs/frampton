import { AttrType } from '../attributes';
import { StyleAttribute, StyleMap } from '../attributes/style';


export function diffStyles(oldStyleDesc: StyleAttribute, newStyleDesc: StyleAttribute): StyleAttribute {
  let diff: StyleAttribute = undefined;

  if (newStyleDesc === undefined) {
    diff = {
      type: AttrType.STYLE,
      value: {}
    };

    for (let key in oldStyleDesc.value) {
      diff.value[key] = undefined;
    }

    return diff;


  } else {
    const oldStyles: StyleMap = oldStyleDesc.value;
    const newStyles: StyleMap = newStyleDesc.value;

    for (let key in oldStyles) {
      const oldValue = oldStyles[key];
      const newValue = newStyles[key];

      if (oldValue !== newValue) {
        diff = (diff || { type: AttrType.STYLE, value: {} });
        diff.value[key] = newValue;
      }
    }

    for (let key in newStyles) {
      if (oldStyles[key] === undefined) {
        diff = (diff || { type: AttrType.STYLE, value: {} });
        diff.value[key] = newStyles[key];
      }
    }

    return diff;
  }
}