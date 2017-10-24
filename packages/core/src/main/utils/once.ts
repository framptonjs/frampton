import { warn } from '../logging';

/**
 * Create a function that can only be called once.
 *
 * @name once
 * @method
 * @memberof Frampton.Utils
 * @param {Function} fn
 * @returns {Function}
 */
export default function once<A>(fn: () => A): () => A;
export default function once<A,B>(fn: (a: A) => B): (a: A) => B;
export default function once<A,B,C>(fn: (a: A, b: B) => C): (a: A, b: B) => C;
export default function once<A,B,C,D>(fn: (a: A, b: B, c: C) => D): (a: A, b: B, c: C) => D;
export default function once<A,B,C,D,E>(fn: (a: A, b: B, c: C, d: D) => E): (a: A, b: B, c: C, d: D) => E;
export default function once(fn: any): any {
  var called = false;

  return function(...args: Array<any>) {
    if (called === false) {
      called = true;
      return fn(...args);
    } else {
      warn('Once function called multiple times');
    }
  };
}
