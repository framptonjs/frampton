import { Task } from '@frampton/core';
import { makeRequest } from './request';
import { send } from './send';
import { defaultSettings } from './utils/default-settings';
import { urlBuilder } from './utils/url';

/**
 * Returns a task that will perform an HTTP GET
 *
 * @name get
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url    Url to send request to
 * @param {Object} [data] Data to send with request. Is encoded and appended to url.
 * @returns {Frampton.Data.Task} A Task of a Response
 */
export function getRequest(url: string, data: any = null) {
  return send(defaultSettings, makeRequest(urlBuilder(url, data)));
}
