export type CacheKey =
  string | number;


export interface SimpleCache<T> {
  [key: string]: T;
}


export interface CachingFunction<T> {
  (): T;
}


export function simpleCache<T>(): (name: CacheKey, fn: CachingFunction<T>) => T {
  const store: SimpleCache<T> = {};

  return function(name: CacheKey, fn: CachingFunction<T>) {
    if (store[name] === undefined) {
      store[name] = fn();
    }

    return store[name];
  };
}
