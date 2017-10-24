/**
 * Compose takes any number of functions and returns a function that when
 * executed will call the passed functions in order, passing the return of
 * each function to the next function in the execution order.
 *
 * @name compose
 * @memberof Frampton.Utils
 * @method
 * @param {function} functions - Any number of function used to build the composition.
 * @returns {function} A new function that runs each of the given functions in succession
 */
export default function compose<A,B,C>(fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => C;
export default function compose<A,B,C,D>(fn3: (b: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => D;
export default function compose<A,B,C,D,E>(fn4: (d: D) => E, fn3: (b: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => E;
export default function compose<A,B,C,D,E,F>(fn5: (d: E) => F, fn4: (d: D) => E, fn3: (b: C) => D, fn2: (b: B) => C, fn1: (a: A) => B): (a: A) => F;
export default function compose(...fns: Array<any>): any {
  return function composition(a: any): any {
    var result: any = a;
    var len: number = fns.length;

    while (len--) {
      result = fns[len](result);
    }

    return result;
  };
}