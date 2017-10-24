export interface CacheMap<T> {
  [arg: string]: T;
}


export default function memoize<T>(fn: (arg: string) => T): (arg: string) => T {
  const cache: CacheMap<T> = {};

  return function(arg: string): T {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}