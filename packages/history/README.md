# Frampton-History

A library for working with browser history in a more functional manner.


## Installation

Frampton is a collection of small peer-dependant libraries.

```
> npm install --save @frampton/core
> npm install --save @frampton/style
> npm install --save @frampton/events
> npm install --save @frampton/history
```


## Usage

Frampton-history exposes observables for monitoring the state of the browser location and methods for updating browser location. These observables are of the Signal class from @frampton/core.


### Signals

```
import { location, path, search, hash } from '@frampton/history';
```

#### location

The location Signal will update anytime the browser location changes.

```
location.onValue((loc: Location): void => {
  // Here code can respond to changes
});
```

#### path

The path Signal will update anytime the pathname of the location changes.

```
path.onValue((pathname: string): void => {
  // Here code can respond to changes
});
```

#### search

The search Signal will update anytime the browser query string changes.

```
search.onValue((query: string): void => {
  // Here code can respond to changes
});
```

#### hash

The hash Signal will update anytime the url hash changes.

```
hash.onValue((hashname: string): void => {
  // Here code can respond to changes
});
```


### Methods

When working with @frampton/history it is suggested to use the provided methods for working with browser history. Frampton maintains some internal state that will get out of sync with the browser if using the native methods.

```
import {
  pushState,
  replacePath,
  replaceState,
  setHash,
  setPath
} from '@frampton/history';
```

#### pushState

Add a new history entry to the browser.

```
pushState({}, 'home_path', '/home');
```

#### replacePath

Change the current browser path by replacing the current history entry.

```
replacePath('/home');
```

#### replaceState

Replace the current history state of the browser.

```
replaceState({}, 'home_path', '/home');
```

#### setHash

Change the current url hash.

```
setHash('home');
```

#### setPath

Change the current browser path by adding new history entry.

```
setPath('/user/1');
```
