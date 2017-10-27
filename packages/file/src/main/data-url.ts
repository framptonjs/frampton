import { Task } from '@frampton/core';
import { read } from './read';
import { Response } from './types';

export function dataURL(file: File) {
  return read('DATA_URL', file);
}
