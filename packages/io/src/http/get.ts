import Request from 'frampton-io/http/request';
import urlBuilder from 'frampton-io/http/utils/url';
import send from 'frampton-io/http/send';
import defaultSettings from 'frampton-io/http/utils/default_settings';

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
export default function get_request(url, data) {
  return send(defaultSettings, Request(urlBuilder(url, data)));
}
