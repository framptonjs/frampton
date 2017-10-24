import { EventAttribute } from '../attributes/events';
import { Runtime } from '../runtime';


export function applyEvent<T>(element: HTMLElement, name: string, event: EventAttribute<T>, runtime: Runtime<T>): void {
  if (event.value.handler !== undefined) {
    runtime.addEvent(element, name, event);
  } else {
    runtime.removeEvent(element, name, event);
  }
}