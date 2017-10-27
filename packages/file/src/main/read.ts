import { Task } from '@frampton/core';
import { fileReader } from './read-api';
import { makeResponse } from './response';
import { ReadMethod, Response } from './types';

// read :: String -> File -> Task Response
export function read(method: ReadMethod, file: File): Task<any, Response, Response> {

  return Task.create((sinks) => {

    const reader = fileReader();

    if (sinks.progress) {
      reader.addEventListener('progress', (evt: any) => {
        sinks.progress(makeResponse('progress', (evt.loaded / evt.total), null));
      });
    }

    reader.addEventListener('load', (evt: any) => {
      sinks.resolve(makeResponse('success', 1, evt.target.result));
    });

    reader.addEventListener('error', (err: any) => {
      sinks.reject(makeResponse('error', 0, err.message));
    });

    reader.addEventListener('abort', (evt: any) => {
      sinks.reject(makeResponse('error', 0, 'abort'));
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
