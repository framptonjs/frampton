import { log } from '../../logging';
import { push } from './runtime';
import { curry, Curried2Result } from '../../utils';
import { ValueSink, ValueMapping, ValuePredicate, ValueReducer } from '../types';


export function emptyUpdate<T>(sig: Signal<T>): void {}


export interface SignalUpdater<T> {
  (sig: Signal<T>, sink: ValueSink<T>): void;
}


export class Signal<T> {
  _update: SignalUpdater<T>;
  _lastUpdater: Signal<any>;
  _isQueued: boolean;
  _value: T;
  parents: Array<Signal<any>>;
  children: Array<Signal<any>>;
  hasValue: boolean;

  static create<T>(initial?: T): Signal<T> {
    return new Signal<T>(emptyUpdate, [], initial);
  }

  /**
   * @name mergeMany
   * @memberof Frampton.Signal
   * @method
   * @param {Frampton.Signal.Signal[]} parents - Signals to merge
   */
  static merge<T>(...parents: Array<Signal<T>>): Signal<T> {
    const initial = ((parents.length > 0) ? parents[0]._value : undefined);

    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      sink(self._lastUpdater._value);
    }, parents, initial);
  }

  static push = curry(<B>(sig: Signal<B>, val: B): void => {
    push(sig, val);
  })

  constructor(update: SignalUpdater<T>, parents: Array<Signal<any>>, initial: T) {
    // Public
    this.parents = (parents || []);
    this.children = [];
    this.hasValue = (initial !== undefined);

    // Private
    this._value = initial;
    this._isQueued = false;
    this._lastUpdater = null;
    this._update = update;

    for (let i = 0; i < this.parents.length; i++) {
      this.parents[i].children.push(this);
    }
  }

  toString(): string {
    return `Signal(${this._value})`;
  }

  push(val: T): void {
    push(this, val);
  }

  get(): T {
    return this._value;
  }

  /**
   * Calls the given function when this Signal has a value. The function is called immediately
   * if this Signal already has a value, then is called again each time this Signal updates.
   *
   * @name onValue
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Function} fn - The function to call
   * @returns {Frampton.Signal.Signal}
   */
  onValue(fn: ValueSink<T>): Signal<T> {
    const parent: Signal<T> = this;
    const child: Signal<T> =
      new Signal((self: Signal<T>, sink: ValueSink<T>) => {
        fn(parent._value);
      }, [ parent ], parent._value);

    // Update immediately if it has a value
    if (child.hasValue) {
      fn(child._value);
    }

    return child;
  }

  /**
   * Works just like the onValue method, just repeated values are dropped.
   *
   * @name onChange
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Function} fn - The function to call
   * @returns {Frampton.Signal.Signal}
   */
  onChange(fn: ValueSink<T>): Signal<T> {
    return this.dropRepeats().onValue(fn);
  }

  /**
   * Calls the given function when this signal updates. This function will call for the first
   * time the next time the Signal updates. If there is a current value on the Signal it is
   * ignored. If you are interested in the current value of the Signal use either the value or
   * changes method.
   *
   * @name onNext
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Function} fn - The function to call
   * @returns {Frampton.Signal.Signal}
   */
  onNext(fn: ValueSink<T>): Signal<T> {
    const parent: Signal<T> = this;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      fn(parent._value);
    }, [ parent ], undefined);
  }

  /**
   * Removes the Signal from the Signal graph.
   *
   * @name close
   * @method
   * @memberof Frampton.Signal.Signal#
   */
  close(): void {
    const sig: Signal<T> = this;
    const childLen: number = sig.children.length;
    const parentLen: number = sig.parents.length;

    for (let i = 0; i < childLen; i++) {
      const child: Signal<any> = sig.children[i];
      child.parents = child.parents.filter((parent: Signal<any>) => {
        return parent !== sig;
      });
    }

    for (let i = 0; i < parentLen; i++) {
      const parent: Signal<any> = sig.parents[i];
      parent.children = parent.children.filter((child: Signal<any>) => {
        return child !== sig;
      });
    }

    sig.children.length = 0;
    sig.parents.length = 0;
  }

  /**
   * Logs the values of a given signal to the console.
   *
   * @name logValue
   * @method
   * @memberof Frampton.Signal.Signal#
   * @returns {Frampton.Signal.Signal}
   */
  logValue(msg?: string): Signal<T> {
    const parent: Signal<T> = this;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (msg !== undefined) {
        log(msg, parent._value);
      } else {
        log(<any>parent._value);
      }
      sink(parent._value);
    }, [ parent ], parent._value);
  }

  /**
   * @name debounce
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Number} delay - Milliseconds to debounce the signal
   * @returns {Frampton.Signal.Signal}
   */
  debounce(delay: number): Signal<T> {
    const parent: Signal<T> = this;
    var timer: number = null;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      timer = setTimeout(() => {
        sink(parent._value);
        timer = null;
      }, (delay || 10));
    }, [ parent ], parent._value);
  }

  /**
   * @name throttle
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Number} delay - Milliseconds to throttle the signal
   * @returns {Frampton.Signal.Signal}
   */
  throttle(delay: number): Signal<T> {
    const parent: Signal<T> = this;
    var timer: number = null;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (!timer) {
        timer = setTimeout(() => {
          sink(parent._value);
          timer = null;
        }, (delay || 10));
      }
    }, [ parent ], parent._value);
  }

  /**
   * @name and
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} predicate - A Signal that must be truthy for values on this Signal
   *                                             to continue.
   * @returns {Frampton.Signal.Signal}
   */
  and(predicate: Signal<any>): Signal<T> {
    const parent: Signal<T> = this;
    const initial = (parent.hasValue && predicate._value) ? parent._value : undefined;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (predicate._value) {
        sink(parent._value);
      }
    }, [ parent ], initial);
  }

  /**
   * @name not
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} predicate - A Signal that must be falsy for values on this Signal
   *                                             to continue.
   * @returns {Frampton.Signal.Signal}
   */
  not(predicate: Signal<any>): Signal<T> {
    const parent: Signal<T> = this;
    const initial = (parent.hasValue && !predicate._value) ? parent._value : undefined;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (!predicate._value) {
        sink(parent._value);
      }
    }, [ parent ], initial);
  }

  /**
   * ap(<*>) :: Signal (a -> b) -> Signal a -> Signal b
   *
   * Given that we are working with a Signal of functions apply the
   * function on the parent Signal to the value on the arg Signal to
   * get the value for the new Signal.
   *
   * @name ap
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} arg
   * @returns {Frampton.Signal.Signal}
   */
  ap<A,B>(this: Signal<(val: A) => B>, arg: Signal<A>): Signal<B> {
    const parent: Signal<(val: A) => B> = this;
    const initial = (parent.hasValue && arg.hasValue) ? parent._value(arg._value) : undefined;

    return new Signal((self: Signal<B>, sink: ValueSink<B>) => {
      sink(parent._value(arg._value));
    }, [ parent ], initial);
  }

  /**
   * dropRepeats :: Signal a -> Signal a
   *
   * Uses strict equals to drop repeated values from the parent signal.
   *
   * @name dropRepeats
   * @method
   * @memberof Frampton.Signal.Signal#
   * @returns {Frampton.Signal.Signal}
   */
  dropRepeats(): Signal<T> {
    return this.filterPrevious((prev: T, next: T): boolean => {
      return (prev !== next);
    });
  }

  /**
   * Like reduce on Arrays, this method is used to reduce all values of a Signal down to a
   * single value using the given function.
   *
   * The function recieves arguments in the order of (accumulator, next value). The function
   * returns a new value that will then be the new accumulator for the next interation.
   *
   * @name fold
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Function} fn
   * @param {Function} initial
   * @returns {Frampton.Signal.Signal}
   */
  fold<B>(fn: ValueReducer<T,B>, initial: B): Signal<B> {
    const parent: Signal<T> = this;

    return new Signal((self: Signal<B>, sink: ValueSink<B>) => {
      sink(fn(self._value, parent._value));
    }, [ parent ], initial);
  }

  /**
   * When the parent Signal updates sample the value of the tag Signal to retrieve the value for the new Signal.
   *
   * @name sample
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} tag
   * @returns {Frampton.Signal.Signal}
   */
  sample<B>(tag: Signal<B>): Signal<B> {
    const parent: Signal<T> = this;

    return new Signal<B>((self: Signal<B>, sink: ValueSink<B>) => {
      sink(tag._value);
    }, [ parent ], tag._value);
  }

  /**
   * Make a new Signal combining the values of these two Signals.
   *
   * @name merge
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} sig2
   * @returns {Frampton.Signal.Signal}
   */
  merge(sig2: Signal<T>): Signal<T> {
    const sig1: Signal<T> = this;
    return Signal.merge(sig1, sig2);
  }

  /**
   * Take the given number of values off of this Signal and then close Signal.
   *
   * @name take
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Number} limit
   * @returns {Frampton.Signal.Signal}
   */
  take(limit: number): Signal<T> {
    const parent: Signal<T> = this;

    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (limit-- > 0) {
        sink(parent._value);
      } else {
        self.close();
      }
    }, [ parent ], undefined);
  }

  /**
   * Return the values of these signals as a tuple
   *
   * @name zip
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Frampton.Signal.Signal} sig
   * @returns {Frampton.Signal.Signal}
   */
  zip<U>(sig: Signal<U>): Signal<[T,U]> {
    const parent: Signal<T> = this;
    const initial: [T,U] = [parent._value, sig._value];

    return new Signal<[T,U]>((self: Signal<[T,U]>, sink: ValueSink<[T,U]>) => {
      sink([ parent._value, sig._value ]);
    }, [ parent ], initial);
  }

  /**
   * Remove values from the Signal based on the given predicate function. If a function is not
   * given then filter will use strict equals with the value given to test new values on the
   * Signal.
   *
   * @name filter
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {*} predicate - Usually a function to test values of the Signal
   * @returns {Frampton.Signal.Signal}
   */
  filter(predicate: ValuePredicate<T>): Signal<T> {
    const parent: Signal<T> = this;

    const filterFn: ValuePredicate<T> =
      function(val: T): boolean {
        if (typeof predicate === 'function') {
          return predicate(val);
        } else {
          return (predicate === val);
        }
      };

    const initial: T = (
      (parent.hasValue && filterFn(parent._value)) ?
        parent._value :
        undefined
    );

    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (filterFn(parent._value)) {
        sink(parent._value);
      }
    }, [ parent ], initial);
  }

  /**
   * @name filterPrevious
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {Function} predicate - A binary function to test the previous value against the current
   *                               value to decide if you want to keep the new value.
   * @returns {Frampton.Signal.Signal}
   */
  filterPrevious(predicate: (prev: T, next: T) => boolean): Signal<T> {
    const parent: Signal<T> = this;
    const initial: T = (parent.hasValue) ? parent._value : undefined;

    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      if (predicate(self._value, parent._value)) {
        sink(parent._value);
      }
    }, [ parent ], initial);
  }

  /**
   * @name map
   * @method
   * @private
   * @memberof Frampton.Signal.Signal#
   * @param {*} mapping - A function or value to map the signal with. If a function, the value
   *                        on the parent signal will be passed to the function and the signal will
   *                        be mapped to the return value of the function. If a value, the value of
   *                        the parent signal will be replaced with the value.
   * @returns {Frampton.Signal.Signal} A new signal with mapped values
   */
  map<B>(mapping: ValueMapping<T,B>): Signal<B> {
    const parent: Signal<T> = this;

    const mappingFn: ValueMapping<T,B> =
      function(val: T): B {
        if (typeof mapping === 'function') {
          return mapping(val);
        } else {
          return mapping;
        }
      };

    const initial: B = (
      (parent.hasValue) ?
        mappingFn(parent._value) :
        undefined
    );

    return new Signal<B>((self: Signal<B>, sink: ValueSink<B>): void => {
      sink(mappingFn(parent._value));
    }, [ parent ], initial);
  }

  /**
   * @name delay
   * @method
   * @memberof Frampton.Signal.Signal#
   * @param {Number} time - Milliseconds to delay values of this Signal.
   * @returns {Frampton.Signal.Signal}
   */
  delay(time: number): Signal<T> {
    const parent: Signal<T> = this;
    return new Signal((self: Signal<T>, sink: ValueSink<T>) => {
      (function(saved) {
        setTimeout(() => {
          sink(saved);
        }, time);
      }(parent._value));
    }, [ parent ], parent._value);
  }
}