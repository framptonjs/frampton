/**
 * @name init
 * @method
 * @memberof Frampton.List
 */
export default function init<T>(xs: Array<T>): Array<T> {
  switch (xs.length) {
    case 0:
      return [];

    default:
      return xs.slice(0, (xs.length - 1));
  }
}
