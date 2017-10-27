import { Task } from '@frampton/core';
import { read } from './read';
import { Response } from './types';

export function arrayBuffer(file: File) {
  return read('ARRAY_BUFFER', file);
}
