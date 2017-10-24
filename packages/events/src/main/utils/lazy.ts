export default function lazy<A,B>(fn: (a: A) => B, args: [A]): () => B;
export default function lazy<A,B,C>(fn: (a: A, b: B) => C, args: [A, B]): () => C;
export default function lazy<A,B,C,D>(fn: (a: A, b: B, c: C) => D, args: [A, B, C]): () => D;
export default function lazy(fn: any, args: Array<any>): any {
  return function() {
    return fn(...args);
  };
}