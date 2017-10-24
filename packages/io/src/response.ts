export interface Response {
  status: string;
  progress: number;
  timestamp: number;
  complete: boolean;
  data: any;
}

/**
 * @name buildResponse
 * @method
 * @memberof Frampton.IO
 * @param {String} status       Current status of request
 * @param {Number} [progress=0] Current progress (0-1) of request
 * @param {Object} [data=null]  Data returned by request
 * @returns {Object}
 */
export function buildResponse(status: string, progress: number, data: any): Response {
  return {
    status: status,
    timestamp: Date.now(),
    progress: (progress || 0),
    complete: (progress === 1),
    data: (data || null)
  };
}
