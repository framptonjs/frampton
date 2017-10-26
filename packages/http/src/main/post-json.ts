import { Curried2Result, curry, isObject, Task } from '@frampton/core';
import { postRequest } from './post';

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
export const postJSON = curry((url: string, data: any = null) => {
  if (isObject(data)) {
    data = JSON.stringify(data);
  }

  return postRequest(url, data, {
    'Content-Type' : 'application/json',
  });
});
