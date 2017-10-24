export interface CurriedResult<A,B> {
  (a: A): B;
}


export interface Curried2Result<A,B,C> {
  (a: A, b: B): C;
  (a: A): CurriedResult<B,C>;
}


export interface Curried3Result<A,B,C,D> {
  (a: A, b: B, c: C): D;
  (a: A, b: B): (c: C) => D;
  (a: A): Curried2Result<B,C,D>;
}


export interface Curried4Result<A,B,C,D,E> {
  (a: A, b: B, c: C, d: D): E;
  (a: A, b: B, c: C): (d: D) => E;
  (a: A, b: B): Curried2Result<C,D,E>;
  (a: A): Curried3Result<B,C,D,E>;
}


export interface Curried5Result<A,B,C,D,E,F> {
  (a: A, b: B, c: C, d: D, e: E): F;
  (a: A, b: B, c: C, d: D): (e: E) => F;
  (a: A, b: B, c: C): Curried2Result<D,E,F>;
  (a: A, b: B): Curried3Result<C,D,E,F>;
  (a: A): Curried4Result<B,C,D,E,F>;
}


function curry_internal(fn: Function, ...args: Array<any>): Function {
  const arity: number = fn.length;

  return function curried(...args2: Array<any>) {

    // an array of arguments for this instance of the curried function
    const locals: Array<any> = args.concat(args2);

    // If we have all the arguments, apply the function and return result
    if (locals.length >= arity) {
      return fn(...locals);

    // If we don't have all the arguments, return a new function that awaits remaining arguments
    } else {
      return curry_internal(fn, ...locals);
    }
  };
}


export function curry<A,B,C>(fn: (a: A, b: B) => C): Curried2Result<A,B,C>;
export function curry<A,B,C,D>(fn: (a: A, b: B, c: C) => D): Curried3Result<A,B,C,D>;
export function curry<A,B,C,D,E>(fn: (a: A, b: B, c: C, d: D) => E): Curried4Result<A,B,C,D,E>;
export function curry<A,B,C,D,E,F>(fn: (a: A, b: B, c: C, d: D, e: E) => F): Curried5Result<A,B,C,D,E,F>;
export function curry(fn: any) {
  return curry_internal(fn);
}