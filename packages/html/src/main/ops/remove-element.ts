import { Runtime } from '../runtime';


export function removeElement<T>(node: Node, runtime: Runtime<T>): void {
  const parentNode: HTMLElement =
    <HTMLElement>node.parentNode;

  runtime.removeAllEvents(node);

  if (parentNode) {
    parentNode.removeChild(node);
  }
}