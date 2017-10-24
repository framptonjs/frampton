import { AttrType } from './AttrType';


export const enum EventType {
  DOM,
  LIFECYCLE
}


export interface EventSink {
  (evt: Event): void;
}


export interface EventHandler<T> {
  (evt: Event): T;
}


export interface EventPredicate<T> {
  (evt: T): boolean;
}


export interface PreviousPredicate<T> {
  (oldVal: T, newVal: T): boolean;
}


export interface EventMapping<A,B> {
  (evt: A): B;
}


export interface LifecycleHandler<T> {
  (element: HTMLElement): T;
}


export interface EventMessenger<A,B> {
  (evt: A, messages: (val: B) => void): void;
}


export interface DomEventDef<T> {
  type: EventType.DOM;
  name: string;
  handler: EventMessenger<Event,T>;
}


export interface LifecycleEventDef<T> {
  type: EventType.LIFECYCLE;
  name: string;
  handler: EventMessenger<HTMLElement,T>;
}


export type EventDef<T> =
  DomEventDef<T> |
  LifecycleEventDef<T>;


export interface EventAttribute<T> {
  type: AttrType.EVENT;
  value: EventDef<T>;
}


// EVENT TRANSFORMERS

function mapHandler<A,B,C>(mapping: EventMapping<B,C>, handler: EventMessenger<A,B>): EventMessenger<A,C> {
  return function(evt: A, messages: (val: C) => void): void {
    handler(evt, function(val: B): void {
      messages(mapping(val));
    });
  }
}


export function mapEvent<A,B>(mapping: EventMapping<A,B>, eventDef: EventDef<A>): EventDef<B> {
  switch (eventDef.type) {
    case EventType.DOM: {
      return {
        type: EventType.DOM,
        name: eventDef.name,
        handler: mapHandler(mapping, eventDef.handler)
      };
    }

    case EventType.LIFECYCLE: {
      return {
        type: EventType.LIFECYCLE,
        name: eventDef.name,
        handler: mapHandler(mapping, eventDef.handler)
      };
    }
  }
}


export function map<A,B>(mapping: EventMapping<A,B>, event: EventAttribute<A>): EventAttribute<B> {
  return {
    type: AttrType.EVENT,
    value: mapEvent(mapping, event.value)
  }
}


function debounceHandler<A,B>(delay: number, handler: EventMessenger<A,B>): EventMessenger<A,B> {
  let timer: number = null;

  return function(evt: A, messages: (val: B) => void): void {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      handler(evt, messages);
      timer = null;
    }, delay);
  }
}


export function debounceEvent<T>(delay: number, eventDef: EventDef<T>): EventDef<T> {
  switch (eventDef.type) {
    case EventType.DOM: {
      return {
        type: EventType.DOM,
        name: eventDef.name,
        handler: debounceHandler(delay, eventDef.handler)
      };
    }

    case EventType.LIFECYCLE: {
      return {
        type: EventType.LIFECYCLE,
        name: eventDef.name,
        handler: debounceHandler(delay, eventDef.handler)
      };
    }
  }
}


export function debounce<T>(delay: number, event: EventAttribute<T>): EventAttribute<T> {
  return {
    type: AttrType.EVENT,
    value: debounceEvent(delay, event.value)
  };
}


function filterHandler<A,B>(predicate: EventPredicate<B>, handler: EventMessenger<A,B>): EventMessenger<A,B> {
  return function(evt: A, messages: (val: B) => void): void {
    handler(evt, function(val: B) {
      if (predicate(val)) {
        messages(val);
      }
    });
  };
}


export function filterEvent<T>(predicate: EventPredicate<T>, eventDef: EventDef<T>): EventDef<T> {
  switch (eventDef.type) {
    case EventType.DOM: {
      return {
        type: EventType.DOM,
        name: eventDef.name,
        handler: filterHandler(predicate, eventDef.handler)
      };
    }

    case EventType.LIFECYCLE: {
      return {
        type: EventType.LIFECYCLE,
        name: eventDef.name,
        handler: filterHandler(predicate, eventDef.handler)
      };
    }
  }
}


export function filter<T>(predicate: EventPredicate<T>, event: EventAttribute<T>): EventAttribute<T> {
  return {
    type: AttrType.EVENT,
    value: filterEvent(predicate, event.value)
  };
}


function filterPreviousHandler<A,B>(predicate: PreviousPredicate<B>, handler: EventMessenger<A,B>): EventMessenger<A,B> {
  let prevVal: B = null;

  return function(evt: A, messages: (val: B) => void): void {
    handler(evt, function(val: B) {
      if (predicate(prevVal, val)) {
        messages(val);
      }

      prevVal = val;
    });
  }
}


export function filterPreviousEvent<T>(predicate: PreviousPredicate<T>, eventDef: EventDef<T>): EventDef<T> {
  let prevVal: T = null;

  switch (eventDef.type) {
    case EventType.DOM: {
      return {
        type: EventType.DOM,
        name: eventDef.name,
        handler: filterPreviousHandler(predicate, eventDef.handler)
      };
    }

    case EventType.LIFECYCLE: {
      return {
        type: EventType.LIFECYCLE,
        name: eventDef.name,
        handler: filterPreviousHandler(predicate, eventDef.handler)
      };
    }
  }
}


export function filterPrevious<T>(predicate: PreviousPredicate<T>, event: EventAttribute<T>): EventAttribute<T> {
  return {
    type: AttrType.EVENT,
    value: filterPreviousEvent(predicate, event.value)
  };
}


export function dropRepeats<T>(event: EventAttribute<T>): EventAttribute<T> {
  return filterPrevious((oldVal: T, newVal: T): boolean => {
    return oldVal !== newVal;
  }, event);
}


// DOM EVENTS

function makeEventMessenger<T>(fn: EventHandler<T>): EventMessenger<Event,T> {
  return function(evt: Event, messages: (val: T) => void): void {
    messages(fn(evt));
  };
}


export function custom<T>(name: string, handler: EventHandler<T>): EventAttribute<T> {
  return {
    type: AttrType.EVENT,
    value: {
      type: EventType.DOM,
      name: name,
      handler: makeEventMessenger(handler)
    }
  };
}


export function onAbort<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('abort', handler);
}


export function onAnimationEnd<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('animationend', handler);
}


export function onAnimationIteration<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('animationiteration', handler);
}


export function onAnimationStart<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('animationstart', handler);
}


export function onAudioEnd<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('audioend', handler);
}


export function onAudioStart<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('audiostart', handler);
}


export function onBlur<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('blur', handler);
}


export function onCanPlay<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('canplay', handler);
}


export function onChange<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('change', handler);
}


export function onClick<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('click', handler);
}


export function onDrag<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('drag', handler);
}


export function onDragEnd<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('dragend', handler);
}


export function onDragEnter<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('dragenter', handler);
}


export function onDragLeave<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('dragleave', handler);
}


export function onDragOver<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('dragover', handler);
}


export function onDragStart<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('dragstart', handler);
}


export function onDrop<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('drop', handler);
}


export function onEnded<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('ended', handler);
}


export function onError<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('error', handler);
}


export function onFocus<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('focus', handler);
}


export function onFocusIn<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('focusin', handler);
}


export function onFocusOut<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('focusout', handler);
}


export function onInput<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('input', handler);
}


export function onInputValue(handler: EventHandler<string>): EventAttribute<string> {
  return custom('input', (evt: Event): string => {
    if ((<HTMLInputElement>evt.target).value !== null) {
      return (<HTMLInputElement>evt.target).value;
    } else {
      return '';
    }
  });
}


export function onKeyDown<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('keydown', handler);
}


export function onKeyPress<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('keypress', handler);
}


export function onKeyUp<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('keyup', handler);
}


export function onLoad<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('load', handler);
}


export function onMouseOver<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('mouseover', handler);
}


export function onMouseOut<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('mouseout', handler);
}


export function onMouseEnter<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('mouseenter', handler);
}


export function onMouseLeave<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('mouseleave', handler);
}


export function onPause<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('pause', handler);
}


export function onPlay<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('play', handler);
}


export function onPlaying<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('playing', handler);
}


export function onResize<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('resize', handler);
}


export function onScroll<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('scroll', handler);
}


export function onSeeked<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('seeked', handler);
}


export function onSeeking<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('seeking', handler);
}


export function onSelect<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('select', handler);
}


export function onStalled<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('stalled', handler);
}


export function onSubmit<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('submit', handler);
}


export function onTimeUpdate<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('timeupdate', handler);
}


export function onTouchCancel<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('touchcancel', handler);
}


export function onTouchEnd<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('touchend', handler);
}


export function onTouchLeave<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('touchleave', handler);
}


export function onTouchMove<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('touchmove', handler);
}


export function onTouchStart<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('touchstart', handler);
}


export function onUnload<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('unload', handler);
}

export function onWheel<T>(handler: EventHandler<T>): EventAttribute<T> {
  return custom('wheel', handler);
}



// LIFECYCLE EVENTS

function makeLifecycleMessenger<T>(fn: LifecycleHandler<T>): EventMessenger<HTMLElement,T> {
  return function(element: HTMLElement, messages: (val: T) => void): void {
    messages(fn(element));
  };
}


export function onRender<T>(handler: LifecycleHandler<T>): EventAttribute<T> {
  return {
    type: AttrType.EVENT,
    value: {
      type: EventType.LIFECYCLE,
      name: 'render',
      handler: makeLifecycleMessenger(handler)
    }
  };
}


// export function onRemove<T>(handler: LifecycleHandler<T>): EventAttribute<T> {
//   return {
//     type: AttrType.EVENT,
//     value: {
//       type: EventType.LIFECYCLE,
//       name: 'remove',
//       handler: makeLifecycleMessenger(handler)
//     }
//   };
// }