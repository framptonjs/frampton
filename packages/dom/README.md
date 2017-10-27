# Frampton DOM

Frampton-DOM is a library for DOM and CSS manipulations in JavaScript.


## Instalation

```sh
$ npm install --save-dev @frampton/dom
```


## Usage

```typescript
import * as DOM from '@frampton/dom';
```

All exported functions of >1 arguments is curried.

For example the addClass function could be used as such.

```typescript
import { addClass } from '@frampton/dom';

const addActive = addClass('active');
addActive(document.getElementById('my-id'));
```

### addClass

Adds class to element.

```typescript
import { addClass } from '@frampton/dom';

// Add class to element
addClass('my-class', element);
```

### applyStyles

Apply a hash of styles to a given element.

The applyStyles function will apply vendor prefixes if needed for the current browser.

```typescript
import { addClass } from '@frampton/dom';

applyStyles({
  'box-shadow': '1px 1px 5px rgba(0,0,0,0.5)',
  'padding': '10px 20px',
  'color': 'red'
}, element);
```

### closest

Returns the closest parent to given element matching selector.

```typescript
import { closest } from '@frampton/dom';

const closestElement: HTMLElement =
  closest('.my-class', element);
```

### contains

Returns true if the given parent contains the given child.

```typescript
import { contains } from '@frampton/dom';

const doesContain: boolean =
  contains(document.getElementById('parent'), document.getElementById('child'));
```

### containsSelector

Returns a boolean indicating if the given element, or one of its children, matches the given selector.

```typescript
import { containsSelector } from '@frampton/dom';

const doesContain: boolean =
  containsSelector('.my-class', element);
```

### currentValue

Returns the current value of the given CSS property on given element. Uses getComputedStyle under the hood.

```typescript
import { currentValue } from '@frampton/dom';

const currentHeight: string =
  currentValue('height', element);
```

### elementValue

Returns the value of the given element as a string.

```typescript
import { elementValue } from '@frampton/dom';

const value: string =
  elementValue(document.getElementById('my-input'));
```

### hasClass

Returns a boolean indicating if given element has given class.

```typescript
import { hasClass } from '@frampton/dom';

const doesHaveClass: boolean =
  hasClass('my-class', element);
```

### matches

Returns a boolean indicating the element matches the given selector.

```typescript
import { matches } from '@frampton/dom';

const doesMatch: boolean =
  matches('.my-class', element);
```

### removeClass

Removes given class from element.

```typescript
import { removeClass } from '@frampton/dom';

removeClass('my-class', element);
```

### removeElement

Removes the given element.

```typescript
import { removeElement } from '@frampton/dom';

removeElement(document.getElementById('to-remove'));
```

### removeStyle

Removes given style from element.

```typescript
import { removeStyle } from '@frampton/dom';

removeStyle('height', element);
```

### selectorContains

Returns a boolean indicating if the given element is contained inside of an element matching given selector. Returns true if the element itself matches selector.

```typescript
import { selectorContains } from '@frampton/html';

selectorContains('.my-class', element);
```

### setStyle

Set value of a style on a given element.

```typescript
import { setStyle } from '@frampton/dom';

setStyle('height', '100px', element);
```

### supported

Returns a string indicating the supported version of a given CSS property on the current browser (vendor prefix applied if needed);

```typescript
import { supported } from '@frampton/dom';

const transformOnBrowser: string =
  supported('transform');
```

### supportedProps

Given a hash of CSS name/value pairs returns a new hash where the property names have any needed vendor prefixes applied.

```typescript
import { supportedProps } from '@frampton/dom';

const browserOpenState =
  supportedProps({
    transform: 'translate(100px)',
    opacity: '0.8',
    perspective: '300px'
  });
```
