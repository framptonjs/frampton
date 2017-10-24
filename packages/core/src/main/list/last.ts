/**
 * @name last
 * @method
 * @memberof Frampton.List
 */
export default function last<T>(xs: Array<T>): T {
  switch (xs.length) {
    case 0:
      return null;

    default:
      return xs[xs.length - 1];
  }
}
