export default function flip_args<A,B,C>(fn: (a: A, b: B) => C): (b: B, a: A) => C {
  return function flipped(a, b) {
    return fn(b, a);
  };
}
