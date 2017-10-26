import { Task } from '@frampton/core';
import { read } from './read';

export function text(file: File) {
  return read('TEXT', file);
}
