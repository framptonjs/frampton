import { curry } from '../../utils';

export abstract class Result<V,E> {
  protected _value: V | E;

  static fromThrowable<A,B>(fn: (a: A) => B): (a: A) => Result<B,string>;
  static fromThrowable<A,B,C>(fn: (a: A, b: B) => C): (a: A, b: B) => Result<C,string>;
  static fromThrowable<A,B,C,D>(fn: (a: A, b: B, c: C) => D): (a: A, b: B, c: C) => Result<D,string>;
  static fromThrowable<A,B,C,D,E>(fn: (a: A, b: B, c: C, d: D) => E): (a: A, b: B, c: C, d: D) => Result<E,string>;
  static fromThrowable(fn: any): any {
    return curry(function(...args: Array<any>) {
      try {
        return new Success(fn(...args));
      } catch(e) {
        return new Failure(e.message);
      }
    });
  }

  static success<T>(val: T): Success<T> {
    return new Success(val);
  }

  static failure<T>(val: T): Failure<T> {
    return new Failure(val);
  }

  abstract map<B>(mapping: (val: V) => B): Success<B> | Failure<E>;

  abstract mapFailure<B>(mapping: (err: E) => B): Success<V> | Failure<B>;

  abstract filter(predicate: (val: V) => boolean): Success<V> | Failure<V> | Failure<E>;

  abstract fork<A,B>(success: (value: V) => A, _: (err: any) => B): A | B;

  abstract isFailure(): boolean;

  abstract isSuccess(): boolean;
}

export class Success<T> extends Result<T,void> {
  _value: T;

  static create<T>(val: T): Success<T> {
    return new Success(val);
  }

  constructor(val: T) {
    super();
    this._value = val;
  }

  toString(): string {
    return `Success(${this._value})`;
  }

  map<B>(mapping: (val: T) => B): Success<B> {
    return new Success(mapping(this._value));
  }

  mapFailure<B>(mapping: (err: any) => B): Success<T> {
    return new Success(this._value);
  }

  filter(predicate: (val: T) => boolean): Success<T> | Failure<T> {
    if (predicate(this._value)) {
      return new Success(this._value);
    } else {
      return new Failure(this._value);
    }
  }

  fork<A,B>(success: (value: T) => A, _: (err: any) => B): A {
    return success(this._value);
  }

  isFailure(): boolean {
    return false;
  }

  isSuccess(): boolean {
    return true;
  }
}


export class Failure<T> extends Result<void,T> {
  _value: T;

  static create<T>(val: T): Failure<T> {
    return new Failure(val);
  }

  constructor(val: T) {
    super();
    this._value = val;
  }

  toString(): string {
    return `Failure(${this._value})`;
  }

  map<B>(mapping: (value: any) => B): Failure<T> {
    return new Failure(this._value);
  }

  mapFailure<B>(mapping: (err: T) => B): Failure<B> {
    return new Failure(mapping(this._value));
  }

  filter(predicate: (value: any) => boolean): Failure<T> {
    return new Failure(this._value);
  }

  fork<A,B>(_: (value: any) => A, failure: (err: T) => B): B {
    return failure(this._value);
  }

  isFailure(): boolean {
    return true;
  }

  isSuccess(): boolean {
    return false;
  }
}
