import { DomEventDef, EventAttribute, EventSink, EventType, LifecycleEventDef } from './attributes/events';
import * as EventDispatcher from './events/dispatcher';

export interface Runtime<T> {
  addEvent(element: HTMLElement, name: string, eventDef: EventAttribute<T>): void;
  removeEvent(element: HTMLElement, name: string, eventDef: EventAttribute<T>): void;
  removeAllEvents(node: Node): void;
  sceneRendered(): void;
}

type LifecycleEventSink = (element: HTMLElement) => void;

interface LifecycleNode {
  element: HTMLElement;
  handler: LifecycleEventSink;
}

function contains(child: HTMLElement, parent: HTMLElement): boolean {
  return (
    child === parent ||
    parent.contains(child)
  );
}

function makeHandler<T>(element: HTMLElement, event: DomEventDef<T>, messages: (evt: T) => void): EventSink {
  return function eventHandler(evt: Event): void {
    event.handler(evt, messages);
  };
}

function makeLifecycleHandler<T>(event: LifecycleEventDef<T>, messages: (evt: T) => void): LifecycleEventSink {
  return function lifecycleHandler(element: HTMLElement): void {
    event.handler(element, messages);
  };
}

function removeAllEvents(node: Node): void {
  const len = node.childNodes.length;
  for (let i = 0; i < len; i++) {
    const childNode: Node = node.childNodes[i];
    EventDispatcher.removeAllEvents(childNode);
    removeAllEvents(childNode);
  }
}

export function makeRuntime<T>(messages: (evt: T) => void): Runtime<T> {
  let lifecycleNodes: Array<LifecycleNode> = [];

  return {
    addEvent(element: HTMLElement, name: string, event: EventAttribute<T>): void {
      switch (event.value.type) {
        case EventType.DOM: {
          const eventHandler: EventSink =
            makeHandler<T>(element, event.value, messages);

          EventDispatcher.addEvent(element, name, event.value, eventHandler);
          break;
        }

        case EventType.LIFECYCLE: {
          lifecycleNodes.push({
            element,
            handler: makeLifecycleHandler<T>(event.value, messages),
          });
          break;
        }
      }
    },

    removeEvent(element: HTMLElement, name: string, event: EventAttribute<T>): void {
      switch (event.value.type) {
        case EventType.DOM: {
          EventDispatcher.removeEvent(element, name);
          break;
        }

        case EventType.LIFECYCLE: {
          const len: number =
            lifecycleNodes.length;

          const newLifecycleNodes: Array<LifecycleNode> =
            [];

          for (let i = 0; i < len; i++) {
            if (lifecycleNodes[i].element !== element) {
              newLifecycleNodes.push(lifecycleNodes[i]);
            }
          }

          lifecycleNodes = newLifecycleNodes;
          break;
        }
      }
    },

    removeAllEvents(node: Node): void {
      setTimeout(() => {
        removeAllEvents(node);
      }, 0);
    },

    sceneRendered(): void {
      let node = lifecycleNodes.pop();
      while (node) {
        node.handler(node.element);
        node = lifecycleNodes.pop();
      }
    },
  };
}
