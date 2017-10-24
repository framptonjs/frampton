import createTask from 'frampton-data/task/create';
import Response from 'frampton-io/response';
import ReadApi from 'frampton-io/file/read_api';

// read_file :: String -> File -> Task Response
export default function read_file(method, file) {

  return createTask((sinks) => {

    const reader = ReadApi();

    if (sinks.start) {
      reader.addEventListener('loadstart', (evt) => {
        sinks.start(Response('start', 0, null));
      });
    }

    if (sinks.progress) {
      reader.addEventListener('progress', (evt) => {
        sinks.progress(Response('progress', (evt.loaded / evt.total), null));
      });
    }

    reader.addEventListener('load', (evt) => {
      sinks.resolve(Response('success', 1, evt.target.result));
    });

    reader.addEventListener('error', (err) => {
      sinks.reject(Response('error', 0, err.message));
    });

    reader.addEventListener('abort', (evt) => {
      sinks.reject(Response('error', 0, 'abort'));
    });

    switch (method) {
      case 'DATA_URL':
        reader.readAsDataURL(file);
        break;

      case 'ARRAY_BUFFER':
        reader.readAsArrayBuffer(file);
        break;

      case 'TEXT':
        reader.readAsText(file);
        break;

      case 'BINARY_STRING':
        reader.readAsBinaryString(file);
        break;
    }

  });
}