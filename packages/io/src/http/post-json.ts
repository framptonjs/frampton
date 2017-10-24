import curry from 'frampton-utils/curry';
import isObject from 'frampton-utils/is_object';
import post from 'frampton-io/http/post';

/**
 * Perform an AJAX POST request and return an EventStream that reports the progress.
 *
 * @name postJson
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url  Url to send request to
 * @param {Object} data Data to send with request
 * @returns {Frampton.Data.Task}
 */
export default curry((url: string, data) => {
  if (isObject(data)) {
    data = JSON.stringify(data);
  }

  return post(url, (data || null), {
    'Content-Type' : 'application/json'
  });
});
