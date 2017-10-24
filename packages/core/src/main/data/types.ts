export type ValueSink<T> =
  (val: T) => void;


export type ValueMapping<A,B> =
  ((val: A) => B) | B;


export type ValuePredicate<T> =
  ((val: T) => boolean) | T;


export type ValueReducer<A,B> =
  (acc: B, next: A) => B;