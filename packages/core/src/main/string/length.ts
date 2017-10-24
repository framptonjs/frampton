import { isSomething, isDefined } from '../utils';
import normalizeNewline from './normalize-newline';

/**
 * @name length
 * @memberof Frampton.String
 * @static
 * @param {String}
 * @returns {Number}
 */
export default function length(str: string): number {
  return (isSomething(str) && isDefined(str.length)) ? normalizeNewline(str).length : 0;
}