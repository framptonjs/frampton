import { Signal } from '@frampton/core';
import { location } from '../signals';


/**
 * @name historyChange
 * @method
 * @memberof Frampton.History.Methods
 * @param {Function} fn A function to call when history changes
 */
export default function history_change(fn: (loc: Location) => void): Signal<Location> {
  return location.onNext(fn);
}
