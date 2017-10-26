import { Task } from '@frampton/core';
import { makeRequest } from './request';
import { send } from './send';
import { defaultSettings } from './utils/default-settings';

/**
 * Returns a task that will perform an HTTP DELETE
 *
 * @name delete
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url  Url to send request to
 * @param {Object} data Data to send with request
 * @returns {Frampton.Data.Task}
 */
export function deleteRequest(url: string, data: any = null) {
  return send(defaultSettings, makeRequest(url, 'DELETE', data));
}
