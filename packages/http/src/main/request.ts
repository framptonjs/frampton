import {
  Request,
  RequestHeaders,
  RequestMethod,
} from './types';

/**
 * @name Request
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url            Url to send request to.
 * @param {String} [method='GET'] Http request method to use
 * @param {Object} [data=null]    Data to send with request
 * @param {Object} [headers={}]   Headers to add to request
 * @returns {Object}
 */
export function makeRequest(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
  headers: RequestHeaders = {},
): Request {
  return {
    url,
    timestamp: Date.now(),
    method,
    body: data,
    headers,
  };
}
