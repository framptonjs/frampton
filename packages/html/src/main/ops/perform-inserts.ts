import { ReorderPatch } from '../patches';
import { Html, NodeType } from '../elements';
import { render } from './render';
import { Runtime } from '../runtime';


function insertAtIndex<T>(node: Html<T>, index: number, parentNode: Node, runtime: Runtime<T>): void {
  const toInsert = render(node, runtime);
  const existingNode = parentNode.childNodes[index];
  if (existingNode) {
    parentNode.insertBefore(toInsert, existingNode);
  } else {
    parentNode.appendChild(toInsert);
  }
}


function insertNode<T>(node: Html<T>, index: number, parentNode: Node, runtime: Runtime<T>): void {
  switch (node.type) {
    case NodeType.KEYED_NODE:
    case NodeType.NODE:
    case NodeType.TEXT: {
      insertAtIndex(node, index, parentNode, runtime);
      break;
    }

    case NodeType.KEYED_CHILD: {
      insertAtIndex(node.node, index, parentNode, runtime);
      break;
    }
  }
}


export function performInserts<T>(inserts: Array<ReorderPatch<T>>, parentNode: Node, runtime: Runtime<T>): void {
  const len = inserts.length;
  for (let i = 0; i < len; i++) {
    insertNode(inserts[i].node, inserts[i].index, parentNode, runtime);
  }
}