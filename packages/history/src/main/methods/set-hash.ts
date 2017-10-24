import { Effect } from '@frampton/core';
import { pushState } from './index';


/**
 * @name setHash
 * @method
 * @memberof Frampton.History
 * @param {String} hash
 */
export default function set_hash(hash: string): Effect<void> {
  return pushState({}, `set-hash-${hash}`, `#${hash}`);
}
