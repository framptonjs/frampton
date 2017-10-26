import { Task } from '@frampton/core';
import { read } from './read';

export function arrayBuffer(file: File) {
  return read('ARRAY_BUFFER', file);
}
