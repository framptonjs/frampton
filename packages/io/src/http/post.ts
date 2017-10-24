import Request from 'frampton-io/http/request';
import send from 'frampton-io/http/send';
import defaultSettings from 'frampton-io/http/utils/default_settings';

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
export default function post_request(url: url, data: any, headers: any) {
  return send(defaultSettings, Request(url, 'POST', (data || null), (headers || null)));
}
