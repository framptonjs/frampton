import { compose, split, List } from '@frampton/core';

function notEmpty(str: string): boolean {
  return (str.trim() !== '');
};

/**
 * @name splitPath
 * @method
 * @private
 * @memberof Frampton.Router
 * @param {String} path A path string to split
 * @returns {Array}
 */
export function splitPath(path: string): Array<string> {
  return List.filter(notEmpty, split('/', path)) as Array<string>;
}
