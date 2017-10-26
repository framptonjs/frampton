import { Task } from '@frampton/core';
import { makeRequest } from './request';
import { send } from './send';
import { RequestHeaders } from './types';
import { defaultSettings } from './utils/default-settings';

/**
 * Returns a task that will perform an HTTP POST
 *
 * @name post
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url  Url to send request to
 * @param {Object} data Data to send with request
 * @returns {Frampton.Data.Task}
 */
export function postRequest(
  url: string,
  data: any = null,
  headers: RequestHeaders = {},
) {
  return send(defaultSettings, makeRequest(url, 'POST', data, headers));
}
