import { Logging, Task } from '@frampton/core';
import AjaxApi from './utils/ajax-api';
import { makeResponse } from './response';
import { Request } from './request'

export interface RequestSettings {
  timeout: number;
}

/**
 * Perform an AJAX request and return an EventStream that reports the progress.
 *
 * @name send
 * @method
 * @memberof Frampton.IO.Http
 * @param {Object} settings A hash of general settings for the request
 * @param {Object} request  A hash describing the request to be made
 * @returns {Frampton.Task} An EventStream of Response objects
 */
export default function send(settings: RequestSettings, request: Request) {
  const xhr: XMLHttpRequest = AjaxApi();

  return Task.create((sinks) => {

    xhr.open(request.method, request.url, true);

    if (sinks.progress) {
      xhr.addEventListener('progress', (evt: ProgressEvent) => {
        let progress = (evt.loaded / evt.total);
        progress = (progress === Infinity) ? 100 : progress;
        sinks.progress(makeResponse('progress', progress, null));
      });
    }

    xhr.addEventListener('error', (err: any) => {
      Logging.error('Processing ' + request.method + ' for: ' + request.url);
      sinks.reject(makeResponse('error', 0, err.message));
    });

    xhr.addEventListener('timeout', (err: any) => {
      Logging.error('Timeout ' + request.method + ' for: ' + request.url);
      sinks.reject(makeResponse('error', 0, 'timeout'));
    });

    xhr.addEventListener('load', (evt: Event) => {
      const target: XMLHttpRequest = evt.target as XMLHttpRequest;
      var response;

      try {
        response = JSON.parse(target.response);
      } catch(e) {
        response = target.response;
      }

      if (target.status >= 200 && target.status < 300) {
        sinks.resolve(makeResponse('success', 1, response));
      } else {
        Logging.error('Non-200 response ' + request.method + ' for: ' + request.url);
        sinks.reject(makeResponse('error', 0, response));
      }
    });

    for (let key in request.headers) {
      xhr.setRequestHeader(key, request.headers[key]);
    }

    xhr.timeout = settings.timeout;

    xhr.send(request.body);
  });
}
