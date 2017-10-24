# Frampton-Events

Frampton-events is a library written in TypeScript for working with events in the browser.


## Installation

```
> npm install --save @frampton/core
> npm install --save @frampton/dom
> npm install --save @frampton/events
```

## Usage

Frampton-events is exposed as a commonJS module.

```
import * as Events from '@frampton/events';
```

### onEvent

There are three methods for creating event streams exposed by frampton-events. The first on these is onEvent. It takes an event name and a HTMLElement to listen for events on. All events are delegated. The only listeners ever attached to the DOM are attached to the documentElement or the window.

The underlying event stream is a Frampton.Data.Signal. Checkout @frampton/core for more information.

```
import { onEvent } from '@frampton/events';


const clicks: Signal<Event> =
  onEvent('click', document.getElementById('my-id'));
```

#### onValue

From here we can listen for events.

```
clicks.onValue((evt: Event): void => {
  // do something
});
```

#### map

We can map events. There are a few utils provided for common transformations.

Get the value of the event target.

```
import { onEvent, eventValue } from '@frampton/events';


const inputValues: Signal<string> =
  onEvent('input', document.getElementById('my-input'))
    .map(eventValue);
```

#### filter

We can also filter events.

With this filter the event only continues on the stream if the event target contains an element matching the given selector.

```
import { onEvent, containsSelector } from '@frampton/events';


const inputValues: Signal<Event> =
  onEvent('input', document.getElementById('my-input'))
    .map(containsSelector('.active'));
```

#### debounce

A common need is debouncing events. One of many methods on Frampton.Data.Signal.

```
import { onEvent } from '@frampton/events';


const inputValues: Signal<Event> =
  onEvent('input', document.getElementById('my-input'))
    .debounce(100);
```


### onSelector

We can also listen for events based on CSS selector.

This will be a stream of events on all elements matching the given selector.

```
import { onSelector } from '@frampton/events';


const clicks: Signal<Event> =
  onSelector('click', '.my-button');
```


### onCustom

You can also listen for events on objects other than HTMLElements. This method will allow you to listen for events on any object that provides a method for listening to events, either through a method called 'on' or a method called 'addEventListener'. This will work with jQuery elements.

```
import { onCustom } from '@frampton/events';


const clicks: Signal<jQueryEvent> =
  onCustom('click', $('.my-button'));
```

### Utilities

As previously seen there are provided utils for working with events.

#### closestToEvent

Gets the element closest to event target (closest parent) that matches given selector.

```
import { onSelector, closestToEvent } from '@frampton/events';


const elements: Signal<HTMLElement> =
  onSelector('click', '.my-element')
    .map(closestToEvent('.active'));
```

#### containsSelector

Returns a boolean indicating if the event target contains an element matching the given selector. Also returns true if the event target matches the selector.

```
import { onSelector, containsSelector } from '@frampton/events';


const clicks: Signal<Event> =
  onSelector('click', '.my-element')
    .filter(containsSelector('.active'));
```

#### contains

Returns a boolean indicating if the event target contains the given element.

```
import { onSelector, contains } from '@frampton/events';


cosnt testEl: HTMLElement =
  <HTMLElement>document.getElementById('my-id');


const clicks: Signal<Event> =
  onSelector('click', '.my-element')
    .filter(contains(testEl));
```

#### eventTarget

Returns the target element of event object.

```
import { onSelector, eventTarget } from '@frampton/events';


const elements: Signal<EventTarget> =
  onSelector('click', '.my-element')
    .map(eventTarget);
```

#### eventValue

Returns the value of the event target.

```
import { isSomething } from '@frampton/core';
import { onSelector, eventValue } from '@frampton/events';


const inputValues: Signal<string> =
  onSelector('input', '.my-element')
    .map(eventValue)
    .filter(isSomething);
```

#### hasSelector

Returns boolean indicating if event target matches given selector.

```
import { onSelector, hasSelector } from '@frampton/events';


const activeClicks: Signal<Event> =
  onSelector('click', '.my-element')
    .filter(hasSelector('.active'));
```

#### preventDefault

Calls preventDefault and stopPropagation on event object.

```
import { onSelector, preventDefault } from '@frampton/events';


const submitClicks: Signal<Event> =
  onSelector('click', '.submit-button')
    .map(preventDefault);
```

#### selectorContains

Returns a boolean indicating if the event target is contained inside an element matching given selector.

```
import { onSelector, selectorContains } from '@frampton/events';


const activeClicks: Signal<Event> =
  onSelector('clicks', '.my-element')
    .filter(selectorContains('.active'));
```

#### stopPropagation

Calls stopPropagation on event object.

```
import { onSelector, stopPropagation } from '@frampton/events';


const submitClicks: Signal<Event> =
  onSelector('click', '.submit-button')
    .map(stopPropagation);
```