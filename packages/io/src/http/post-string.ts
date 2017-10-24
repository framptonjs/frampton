import { curry, isObject } from '@frampton/core';
import post from './post';
import { queryString } from './utils';

/**
 * Perform an AJAX POST request and return an EventStream that reports the progress.
 *
 * @name postString
 * @method
 * @memberof Frampton.IO.Http
 * @param {String} url  Url to send request to
 * @param {Object} data Data to send with request
 * @returns {Frampton.Data.Task}
 */
export default curry((url: string, data) => {
  if (isObject(data)) {
    data = queryString(data);
  }

  return post(url, (data || null), {
    'Content-Type' : 'application/x-www-form-urlencoded'
  });
});
