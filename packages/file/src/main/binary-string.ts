import { Task } from '@frampton/core';
import { read } from './read';

export function binaryString(file: File) {
  return read('BINARY_STRING', file);
}
