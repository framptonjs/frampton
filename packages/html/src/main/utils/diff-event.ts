import { AttrType } from '../attributes/AttrType';
import { EventAttribute, EventType } from '../attributes/events';


function emptyEvent<T>(template: EventAttribute<T>): EventAttribute<T> {
  switch (template.value.type) {
    case EventType.DOM: {
      return {
        type: AttrType.EVENT,
        value: {
          type: EventType.DOM,
          name: template.value.name,
          handler: undefined
        }
      };
    }

    case EventType.LIFECYCLE: {
      return {
        type: AttrType.EVENT,
        value: {
          type: EventType.LIFECYCLE,
          name: template.value.name,
          handler: undefined
        }
      };
    }
  }
}


export function diffEvent<T>(oldEvent: EventAttribute<T>, newEvent: EventAttribute<T>): EventAttribute<T> {
  if (newEvent === undefined) {
    return emptyEvent(oldEvent);
  } else if (oldEvent.value.handler !== newEvent.value.handler) {
    switch (newEvent.value.type) {
      case EventType.DOM: {
        return {
          type: AttrType.EVENT,
          value: {
            type: EventType.DOM,
            name: newEvent.value.name,
            handler: newEvent.value.handler
          }
        };
      }

      case EventType.LIFECYCLE: {
        return {
          type: AttrType.EVENT,
          value: {
            type: EventType.LIFECYCLE,
            name: newEvent.value.name,
            handler: newEvent.value.handler
          }
        };
      }
    }
  }
}