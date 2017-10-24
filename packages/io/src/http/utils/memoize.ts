export default <A>(fn: () => A): () => A;
export default <A,B>(fn: (a: A) => B): (a: A) => B;
export default <A,B,C>(fn: (a: A, b: B) => C): (a: A, b: B) => C;
export default <A,B,C,D>(fn: (a: A, b: B, c: C) => D): (a: A, b: B, c: C) => D;
export default <A,B,C,D,E>(fn: (a: A, b: B, c: C, d: D) => E): (a: A, b: B, c: C, d: D) => E;
export default (fn: (...args: Array<any>) => any): (...args: Array<any>) => any => {
  var value: any = undefined;
  return (...args: Array<any>): any {
    if (value !== undefined) {
      value = fn(...args);
    }

    return value;
  }
}
