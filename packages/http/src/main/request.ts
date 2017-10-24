export type RequestMethod
  = 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';


export interface RequestHeaders {
  [name: string]: string;
}


export interface Request {
  url: string;
  timestamp: number;
  method: RequestMethod;
  body: any;
  headers: RequestHeaders;
}


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
  headers: RequestHeaders = {}
): Request {
  return {
    url: url,
    timestamp: Date.now(),
    method: method,
    body: data,
    headers: headers
  };
}
