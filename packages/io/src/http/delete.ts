import Request from 'frampton-io/http/request';
import send from 'frampton-io/http/send';
import defaultSettings from 'frampton-io/http/utils/default_settings';

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
export default function delete_request(url, data) {
  return send(defaultSettings, Request(url, 'DELETE', (data || null)));
}
