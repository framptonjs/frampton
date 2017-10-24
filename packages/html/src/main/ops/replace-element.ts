import { Runtime } from '../runtime';


export function replaceElement<T>(replacement: Node, toReplace: Node, runtime: Runtime<T>): void {
  const parentNode = <HTMLElement>toReplace.parentNode;
  runtime.removeAllEvents(toReplace)

  if (parentNode) {
    parentNode.replaceChild(replacement, toReplace);
  }
}