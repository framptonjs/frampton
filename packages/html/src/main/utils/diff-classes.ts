import { AttrType } from '../attributes';
import { ClassAttribute, ClassMap } from '../attributes/classes';


export function diffClasses(oldClassDesc: ClassAttribute, newClassDesc: ClassAttribute): ClassAttribute {
  let diff: ClassAttribute = undefined;

  if (newClassDesc === undefined) {
    diff = {
      type: AttrType.CLASS_LIST,
      value: {}
    };

    for (let key in oldClassDesc.value) {
      diff.value[key] = false;
    }

    return diff;


  } else {
    const oldClasses: ClassMap = oldClassDesc.value;
    const newClasses: ClassMap = newClassDesc.value;

    for (let key in oldClasses) {
      const oldValue = oldClasses[key];
      const newValue = newClasses[key];

      if (oldValue !== newValue) {
        diff = (diff || { type: AttrType.CLASS_LIST, value: {} });
        diff.value[key] = newValue;
      }
    }

    for (let key in newClasses) {
      if (oldClasses[key] === undefined) {
        diff = (diff || { type: AttrType.CLASS_LIST, value: {} });
        diff.value[key] = newClasses[key];
      }
    }

    return diff;
  }
}