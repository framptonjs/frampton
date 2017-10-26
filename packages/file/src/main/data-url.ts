import { Task } from '@frampton/core';
import { read } from './read';

export function dataURL(file: File) {
  return read('DATA_URL', file);
}
