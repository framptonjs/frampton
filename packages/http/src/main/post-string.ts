import { Curried2Result, curry, isObject, Task } from '@frampton/core';
import { postRequest } from './post';
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
export const postString = curry((url: string, data: any = null) => {
  if (isObject(data)) {
    data = queryString(data);
  }

  return postRequest(url, null, {
    'Content-Type' : 'application/x-www-form-urlencoded',
  });
});
