# Frampton-Core

Frampton is a library to assist writing JavaScript in a functional manner. Frampton supplies an observable implementation (Frampton.Data.Signal). Frampton also provides a number of utilities for dealing with common JavaScript types in a more functional manner (Frampton.List, Frampton.Obj).

Frampton is written in Typescript and I believe functional programming is a nicer experience when strongly typed.


## Frampton.Data

Frampton.Data module exposes a few abstract data types that make working functionally a little easier.


### Frampton.Data.Signal

A Signal is a value that changes over time. Signals provide methods to alter their values or to be alerted to the changing state of those values.

```
import { Signal } from '@frampton/core';
```

#### create

Creates a new Signal

```
// create a new signal
const sig: Signal<number> =
  Signal.create<number>();

// create a signal with an initial value
const sig2: Signal<number> =
  Signal.create(5);
```

#### onValue

Be alerted to values on the signal. The onValue method will be called any time a new value is pushed onto the Signal. The onValue method will be called immediately if the Signal already has a value.

```
sig2.onValue((val: number): void => {
  console.log('value = ' + val);
});
```

#### onNext

The onNext method is almost identical to the onValue method except it will never be called immediately it will wait until the next value is pushed onto the Signal.

```
sig2.onNext((val: number): void => {
  console.log('next = ' + val);
});
```

#### onChange

The onChange method is like onValue except it will only alert you for new values that are strictly not equal to the previous value on the Signal.

```
sig2.onChange((val: number): void => {
  console.log('changes = ' + val);
});
```

#### push

There are two ways to push values onto a Signal. With the static push method and the instance push method. The static method is curried. It is useful for when you want to pass a function to update a Signal to another context.

```
// Using the instance method.
sig2.push(5);

// Using the static method
Signal.push(sig2, 6);

// The static push method is curried
const pushToSig: (val: number) => void =
  Signal.push(sig2);

pushToSig(6);
```

#### get

Returns the current value of the Signal.

```
sig2.get();
```

#### filter

Returns a new Signal that only contains values from the parent Signal that satisfy the given predicate.

If you pass a non-function value to this method it will check for strict equality with that value.

```
const greaterThanFive: Signal<number> =
  sig2.filter((val) => val > 5);

// A Signal of only 10's
const tens: Signal<number> =
  sig2.filter(10);
```

#### filterPrevious

Filters values on the Signal with the previous value.

This is how onChange is implemented.

```
const changes: Signal<number> =
  sig2.filterPrevious((prevValue: number, nextValue: number): boolean => {
    return prevValue !== nextValue;
  });
```

#### map

Returns a new Signal with the values of the parent Signal transformed with the given function.

If you pass a non-function value to the map function values on the parent Siganl will be replaced in the new Signal with the given value.

```
const plusOne: Signal<number> =
  sig2.map((val: number): number => val + 1);

// A Signal of 5's
const fives: Signal<number> =
  sig2.map(5);
```

#### and

Filters a Signal with another Signal. Values will only continue from the parent Signal to the new child Signal if the argument Signal currently has a truthy value.

```
const conditionMet: Signal<number> =
  sig2.and(sig);
```

#### not

Filters a Signal with another Signal. Values will only continue from the parent Signal to the new child Signal if the argument Signal currently has a falsy value.

```
const notCondition: Signal<number> =
  sig2.not(sig);
```

#### sample

Any time a new value is pushed onto the parent Signal the new child Signal will take the value of the argument Signal.

```
const replace: Signal<number> =
  sig2.sample(sig);
```

#### merge

Creates a new Signal containing values from multiple Signals. The instance method combines the parent with one other Signal. The static method can merge n number of Signals into one.

```
// Instance method
const bothSignals: Signal<number> =
  sig2.merge(sig);

// Static method
const merged: Signal<number> =
  Signal.merge(sig, sig2);
```

#### zip

Returns a new Signal by combining the values of two Signals into a tuple.

```
const tupleSignal: Signal<[number,number]> =
  sig2.zip(sig);
```

#### fold

Works like reduce on Arrays. Combines all values that occur on the parent Signal into a single value.

```
// This counts how many times sig2 is called
const counter: Signal<number> =
  sig2.fold((acc: number, next: number): number => {
    return acc + 1;
  }, 0);
```

#### debounce

Returns a new Signal that limits the number of times the value can be updated per given milliseconds.

```
// This counts how many times sig2 is called
const rateLimited: Signal<number> =
  sig2.debounce(1000);
```


### Frampton.Data.Result

A Result is used to represent values that can be the result of successful or failed computations. It is analogous to Either in some functional programming languages. Result has two subclasses, Success and Failure.

```
import { Result, Success, Failure } from '@frampton/core';
```

#### success

Creates a new instance of a Success.

```
const success: Success<number> =
  Result.success(5);
```

#### failure

Creates a new instance of a Failure.

```
const failure: Failure<number> =
  Result.failure(8);
```

#### fromThrowable

Creates a Result from a function that may throw an error.

This method is static and curried.

```
const wrappedFn: Result<number,string> =
  Result.fromThrowable((num) => {
    if (num > 5) {
      return num;
    } else {
      throw new Error('Too small');
    }
  });

wrappedFn(10); // -> 'Success(10)'
wrappedFn(2); // -> 'Failure(Too small)'


// fromThrowable returns a curried function
const testValues: Result<number,string> =
  Result.fromThrowable((first, second) => {
    if (first > second) {
      throw new Error('Second too small');
    } else {
      return second;
    }
  });

const testSix: Result<number,string> =
  testValues(6);

testSix(8); // -> 'Success(8)';
testSix(2); // -> 'Failure(Second too small)'
```

#### map

Creates a new Result by mapping Success values, Failures are ignored.

```
// map successful values
const mapping =
  (val: number): number => val + 5;

const mappedSuccess: Success<number> =
  success.map(mapping); // -> 'Success(10)'

const mappedFailure: Failure<number> =
  failure.map(mapping); // -> 'Failure(8)'
```

#### mapFailure

Creates a new Result by mapping Failure values, Successes are ignored.

```
const mapping =
  (val: number): number => val + 3;

const mappedSuccess: Success<number> =
  success.mapFailure(mapping); // -> 'Success(5)'

const mappedFailure: Failure<number> =
  failure.mapFailure(mapping); // -> 'Failure(11)'
```

#### filter

Creates a new Result by filtering Successes. Successes become Failures if they fail predicate. Failures are ignored.

```
const predicate =
  (val: number): number => val > 10;

const filteredSuccess: Result<number,number> =
  success.filter(predicate); // -> 'Failure(5)'

const filteredFailure: Failure<number> =
  failure.filter(predicate); // -> 'Failure(8)'
```

#### fork

Runs a different callback for Success or Failure and returns the result.

```
const onSuccess =
  (val: number): number => val + 3;

const onFailure =
  (val: number): number => val + 10;

const successResult: number =
  success.fork(onSuccess, onFailure); // -> 8

const failureResult: number =
  failure.fork(onSuccess, onFailure); // -> 18
```


### Frampton.Data.Maybe

A Maybe is used to represent a value that may be null or undefined. This gives you an interface for dealing with such values without having to constantly do null checks. It also specifies in the type that this is a value that may not exist.

In Frampton Maybes are an interface that is implemented by Just and Nothing. Here we're using Haskell naming conventions. A Just represents a value and a Nothing is a missing value.

```
import { Maybe } from '@frampton/core';
```

#### fromNullable

A static method that creates new Maybes. Returns a Nothing if the given value is null or undefined, otherwise it returns a Just.

```
const maybeOne: Maybe<number> =
  Maybe.fromNullable(1); // -> 'Just(1)'

const maybeNothing: Maybe<number> =
  Maybe.fromNullable(null); // -> 'Nothing'
```

#### just

Creates a new Just.

```
cosnt maybeFive: Maybe<number> =
  Maybe.just(5); // -> 'Just(5)'
```

#### nothing

Creates a new Nothing.

```
cosnt maybeNull: Maybe<number> =
  Maybe.nothing<number>(); // -> 'Nothing'
```

#### map

Returns a new Maybe by transforming the value inside of a Just, Nothings are ignored.

```
const mapping =
  (val: number): number => val + 2;

const updatedOne: Maybe<number> =
  maybeOne.map(mapping); // -> 'Just(3)'

const updatedNothing: Maybe<number> =
  maybeNothing.map(mapping); // 'Nothing'
```

#### filter

```
// filter the value of a Maybe
const predicate =
  (val: number): boolean => val > 2;

const filteredOne: Maybe<number> =
  maybeOne.filter(predicate); // -> 'Nothing'

const filteredUpdatedOne: Maybe<number> =
  updatedOne.filter(predicate); // -> 'Just(3)'

const filteredNothing: Maybe<number> =
  updatedNothing.filter(predicate); // -> 'Nothing'
```

#### join

Returns a new Maybe that removes one level of nesting in nested Maybes.

```
const nested: Maybe<Maybe<number>> =
  Maybe.create(Mabye.create(5)); // -> 'Just(Just(5))'

cosnt flattened: Maybe<number> =
  nested.join(); // -> 'Just(5)'

// join only removes one level of nesting
const doubleNested: Maybe<Mabye<Mabye<number>>> =
  Maybe.create(Maybe.create(Mabye.create(5))); // -> 'Just(Just(Just(5)))'

cosnt doubleFlattened: Maybe<Mabye<number>> =
  doubleNested.join(); // -> 'Just(Just(5))'
```

#### get

Returns the current value of a Maybe, throws an error if Nothing.

```
// get the value from a Maybe
const one: number =
  maybeOne.get(); // -> 1

const nothing: number =
  maybeNothing.get(); // -> Error: can't get value of Nothing
```

#### getOrElse

Returns current value or returns provided default in case of a Nothing.

```
const safeOne: number =
  maybeOne.getOrElse(5); // -> 1

const safeNothing: number =
  maybeNothing.getOrElse(5); // -> 5
```


### Frampton.Data.Task

A Task is essentially an IO monad. Use it to wrap IO operations that may fail. Tasks are particularly good for wrapping async operations. Much like promises. The difference is a Task is a description of a computation. It can be run over and over again. It does not save the values of completed operations.

Tasks are lazy. A Task can be described without being run.

```
import { Task } from '@frampton/core';
```

#### create

Creates a new Task. A Task is essentially a wrapper for a function. The create method takes one argument, the function to run. In order to notify the world about the state of the Task the function must accept an object containing callbacks it wishes to call.

The interface for the TaskSinks object.

```
interface TaskSinks<E,V,P> {
  reject(err: E): void;
  resolve(val: V): void;
  progress(prog: P)?: void;
}
```

```
const waitTwoSeconds: Task<Error,string,never> =
  Task.create((sinks: TaskSinks<Error,string,never>) => {
    setTimeout(() => {
      sinks.resolve('2 seconds passes');
    }, 2000);
  });


// The above just describes the task. To run it...
waitTwoSeconds.run({
  resolve(msg: string): void {
    console.log(msg);
  },
  reject(err: Error): void {
    console.log('err: ', err);
  }
});
```

#### filter

Creates a new Task by filtering the results of the parent Task. If the result of a Task fails the predicate a reject becomes a resolve.

```
const random: Task<number,number,never> =
  Task.create((sinks) => {
    sinks.resolve(Math.random() * 100);
  });

const randomOverFifty: Task<number,number,never> =
  random.filter((val) => val > 50);
```

#### map

Creates a new Task that transforms the resolve values of the parent Task.

```
// After 2 seconds emits a 5.
const delayedFive: Task<Error,number,never> =
  waitTwoSeconds.map(5);

// Map can also take a function
const delayedFunc: Task<Error,string,never> =
  waitTwoSeconds.map((msg: string): string => {
    return msg.toUpperCase();
  });
```

#### concat

Creates a new Task that runs two Tasks in sequence. The results of the first Task are disgaurded.

```
const waitFourSeconds: Task<Error,string,never> =
  waitTwoSeconds.concat(waitTwoSeconds);
```

#### chain

Creates a new Task that chains two Tasks together. The chain method takes a function that takes the successful value of the previous Task and returns a new Task.

```
const getResults =
  (query: string): Task<Error,Array<string>,never> =>
    Task.create((sinks) => {
      $.get(`/search/${query}`).then((res) => {
        sinks.resolve(res);
      }, (err) => {
        sinks.reject(err);
      });
    });

const displayResults
  (results: Array<string>): Task<Error,void,never> =>
    Task.create((sinks) => {
      const listItems: string =
        results.reduce((acc, next) => {
          return acc + `<li>${next}</li>`;
        }, '');

      const container: Element =
        document.getElementById('result-container');

      container.innerHTML = listItems;

      sinks.resolve(null);
    });

const getAndDisplay =
  (query: string): Task<Error,void,never> =>
    getResults(query).chain(displayResults);
```

#### recover

Creates a new Task that can never fail, any rejects will be mapped to resolves by the provided function.

```
const httpGet =
  (url: string): Task<Error,any,never> =>
    Task.create((sinks) => {
      $.get(url).then((res) => {
        sinks.resolve(res);
      }, (err) => {
        sinks.reject(err);
      });
    });


const neverFailRequest: Task<never,any,never> =
  httpGet('http://fake.com/api/posts')
    .recover((err) => {
      // on failure return an empty array.
      return [];
    });
```

#### default

Creates a new Task that can never fail, any rejects are replaced as resolves with the provided value.

```
// Or, just supply a default value for failure
const neverFailRequest: Task<never,any,never> =
  httpGet('http://fake.com/api/posts').default([]);
```

#### when

Creates a new Task that runs n Tasks in parallel.

```
Task.when(/* tasks to run */).run(...);
```

#### sequence

Creates a new Task that runs n Tasks in sequence.

```
Task.sequence(/* tasks to run */).run(...);
```

#### batch

Creates a new Task that runs n Tasks in sequence. The difference with sequence is that the provided sinks will be updated after every child Task completes its work.

```
Task.batch(/* tasks to run */).run(...);
```