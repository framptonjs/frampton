import { ReorderPatch } from '../patches';
import { Html, NodeType } from '../elements';
import { removeElement } from './remove-element';
import { Runtime } from '../runtime';


function deleteNode<T>(node: Html<T>, runtime: Runtime<T>): void {
  switch (node.type) {
    case NodeType.KEYED_NODE:
    case NodeType.NODE:
    case NodeType.TEXT: {
      removeElement(node.domNode, runtime);
      break;
    }

    case NodeType.KEYED_CHILD: {
      removeElement(node.node.domNode, runtime);
      break;
    }
  }
}


export function performDeletes<T>(deletes: Array<ReorderPatch<T>>, runtime: Runtime<T>): void {
  const len = deletes.length;
  for (let i = 0; i < len; i++) {
    deleteNode(deletes[i].node, runtime);
  }
}