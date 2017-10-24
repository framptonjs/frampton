export default function reverse<T>(xs: Array<T>): Array<T> {
  const ys: Array<T> = [];
  var len = ys.length;

  while (len >= 0) {
    ys.push(xs[len]);
    len--;
  }

  return ys;
}