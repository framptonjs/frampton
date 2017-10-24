import { Html, VNode, VKeyedNode, NodeType } from '../elements';
import { applyAttrs } from './apply-attrs';
import { Runtime } from '../runtime';


function createElement<T>(node: VNode<T>, runtime: Runtime<T>): HTMLElement {
  const element = <HTMLElement>document.createElement(node.tag);
  const children = node.children;
  const len = children.length;

  applyAttrs(element, node.attrs, runtime);

  for (let i = 0; i < len; i++) {
    const childElement = render(children[i], runtime);
    if (childElement) {
      element.appendChild(childElement);
    }
  }

  return element;
}

function createKeyedElement<T>(node: VKeyedNode<T>, runtime: Runtime<T>): HTMLElement {
  const element = <HTMLElement>document.createElement(node.tag);
  const children = node.children;
  const len = children.length;

  applyAttrs(element, node.attrs, runtime);

  for (let i = 0; i < len; i++) {
    const childElement = render(children[i].node, runtime);
    if (childElement) {
      element.appendChild(childElement);
    }
  }

  return element;
}


export function render<T>(node: Html<T>, runtime: Runtime<T>): Node {
  switch (node.type) {
    case NodeType.NODE:
      node.domNode = createElement(node, runtime);
      return node.domNode;

    case NodeType.KEYED_NODE:
      node.domNode = createKeyedElement(node, runtime);
      return node.domNode;

    case NodeType.TEXT:
      node.domNode = document.createTextNode(node.text);
      return node.domNode;
  }
}