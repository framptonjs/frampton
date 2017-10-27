import { Task } from '@frampton/core';
import { read } from './read';
import { Response } from './types';

export function text(file: File) {
  return read('TEXT', file);
}
