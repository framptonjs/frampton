import { Response } from './types';

/**
 * @name Response
 * @method
 * @memberof Frampton.IO
 * @param {String} status       Current status of request
 * @param {Number} [progress=0] Current progress (0-1) of request
 * @param {Object} [data=null]  Data returned by request
 * @returns {Object}
 */
export function makeResponse(status: string, progress: number = 0, data: any = null): Response {
  return {
    status,
    timestamp: Date.now(),
    progress,
    complete: (progress === 1),
    data,
  };
}
