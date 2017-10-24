import { Patch, PatchType } from '../patches';
import { applyAttrs } from './apply-attrs';
import { performDeletes } from './perform-deletes';
import { performInserts } from './perform-inserts';
import { performMoves } from './perform-moves';
import { removeElement } from './remove-element';
import { replaceElement } from './replace-element';
import { render } from './render';
import { Runtime } from '../runtime';


export function applyPatch<T>(patch: Patch, runtime: Runtime<T>): void {
  switch (patch.type) {
    case PatchType.APPEND: {
      const parentNode = patch.domNode;
      parentNode.appendChild(render(patch.data, runtime));
      break;
    }

    case PatchType.REMOVE: {
      removeElement(patch.domNode, runtime);
      break;
    }

    case PatchType.REPLACE: {
      const toReplace = patch.domNode;
      const replacement = render(patch.data, runtime);
      replaceElement(replacement, toReplace, runtime);
      break;
    }

    case PatchType.PROPS: {
      applyAttrs(<HTMLElement>patch.domNode, patch.data, runtime);
      break;
    }

    case PatchType.TEXT: {
      patch.domNode.textContent = patch.data;
      break;
    }

    case PatchType.HTML: {
      (<HTMLElement>patch.domNode).innerHTML = patch.data;
      break;
    }

    case PatchType.REORDER: {
      performMoves(patch.data.moves, patch.domNode);
      performDeletes(patch.data.deletes, runtime);
      performInserts(patch.data.inserts, patch.domNode, runtime);
      break;
    }

    default:
      const _exhaustiveCheck: never = patch.type;
      throw new Error(`Non-exhaustive pattern match for patch: ${_exhaustiveCheck}`);
  }
}


export function applyPatches<T>(patches: Array<Patch>, runtime: Runtime<T>): void {
  const len = patches.length;
  for (let i = 0; i < len; i++) {
    const patch = patches[i];
    applyPatch(patch, runtime);
  }
}