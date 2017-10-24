import { Effect } from '@frampton/core';
import { replaceState } from './index';


/**
 * @name replacePath
 * @method
 * @memberof Frampton.History
 * @param {String} path
 */
export default function replace_path(path: string): Effect<void> {
  return replaceState({}, `replace-path-${path}`, path);
}
