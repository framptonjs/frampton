import { simpleCache, CacheKey } from './simple-cache';


export default function cached<T>(fn: (key: CacheKey) => T): (key: CacheKey) => T {
  const cache = simpleCache<T>();

  return function(key: CacheKey) {
    return cache(key, function() {
      return fn(key);
    });
  };
}