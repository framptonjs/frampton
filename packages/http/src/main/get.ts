import { Task } from '@frampton/core'
import { makeRequest } from './request';
import urlBuilder from './utils/url';
import send from './send';
import defaultSettings from './utils/default-settings';

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
export default function get_request(url: string, data: any) {
  return send(defaultSettings, makeRequest(urlBuilder(url, data)));
}
