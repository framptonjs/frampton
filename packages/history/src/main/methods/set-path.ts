import { Effect } from '@frampton/core';
import { pushState } from './index';


/**
 * @name setPath
 * @method
 * @memberof Frampton.History
 * @param {String} hash
 */
export default function set_path(path: string): Effect<void> {
  return pushState({}, `set-path-${path}`, path);
}
