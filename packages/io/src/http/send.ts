import error from 'frampton-utils/error';
import createTask from 'frampton-data/task/create';
import AjaxApi from 'frampton-io/http/utils/ajax_api';
import Response from 'frampton-io/response';

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
export default function send(settings, request) {

  const xhr = AjaxApi();

  return createTask((sinks) => {

    xhr.open(request.method, request.url, true);

    if (sinks.start) {
      xhr.addEventListener('loadstart', (evt) => {
        sinks.start(Response('start', 0, null));
      });
    }

    if (sinks.progress) {
      xhr.addEventListener('progress', (evt) => {
        let progress = ((evt.loaded || evt.position) / (evt.total || evt.totalSize));
        progress = (progress === Infinity) ? 100 : progress;
        sinks.progress(Response('progress', progress, null));
      });
    }

    xhr.addEventListener('error', (err) => {
      error('Processing ' + request.method + ' for: ' + request.url);
      sinks.reject(Response('error', 0, err.message));
    });

    xhr.addEventListener('timeout', (err) => {
      error('Timeout ' + request.method + ' for: ' + request.url);
      sinks.reject(Response('error', 0, 'timeout'));
    });

    xhr.addEventListener('load', (evt) => {

      const target = evt.target;
      var response;

      try {
        response = JSON.parse(target.response);
      } catch(e) {
        response = target.response;
      }

      if (target.status >= 200 && target.status < 300) {
        sinks.resolve(Response('success', 1, response));
      } else {
        error('Non-200 response ' + request.method + ' for: ' + request.url);
        sinks.reject(Response('error', 0, response));
      }
    });

    for (let key in request.headers) {
      xhr.setRequestHeader(key, request.headers[key]);
    }

    xhr.timeout = settings.timeout;

    xhr.send(request.body);
  });
}
