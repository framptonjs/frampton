import { Html } from './elements';

export const enum PatchType {
  PROPS,
  REPLACE,
  APPEND,
  REMOVE,
  TEXT,
  HTML,
  REORDER,
}

export interface Patch {
  type: PatchType;
  data: any;
  domNode: Node;
}

export interface ReorderPatch<T> {
  node: Html<T>;
  index?: number;
  oldIndex?: number;
  newIndex?: number;
}

export interface ReorderDiff<T> {
  inserts: Array<ReorderPatch<T>>;
  deletes: Array<ReorderPatch<T>>;
  moves: Array<ReorderPatch<T>>;
}

export function makePatch(type: PatchType, data: any, domNode: Node = null): Patch {
  return {
    type,
    data,
    domNode,
  };
}

export function reorderPatch<T>(diff: ReorderDiff<T>, domNode: Node): Patch {
  return makePatch(PatchType.REORDER, diff, domNode);
}

export function replacePatch<T>(newNode: Html<T>, oldNode: Node): Patch {
  return makePatch(PatchType.REPLACE, newNode, oldNode);
}

export function propsPatch(diff: any, domNode: Node): Patch {
  return makePatch(PatchType.PROPS, diff, domNode);
}

export function textPatch(diff: any, domNode: Node): Patch {
  return makePatch(PatchType.TEXT, diff, domNode);
}

export function appendPatch(diff: any, domNode: Node): Patch {
  return makePatch(PatchType.APPEND, diff, domNode);
}

export function removePatch(diff: any, domNode: Node): Patch {
  return makePatch(PatchType.REMOVE, diff, domNode);
}
