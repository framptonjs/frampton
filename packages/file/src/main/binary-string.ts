import { Task } from '@frampton/core';
import { read } from './read';
import { Response } from './types';

export function binaryString(file: File) {
  return read('BINARY_STRING', file);
}
