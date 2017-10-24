import { curry, Curried2Result, Task } from '@frampton/core';
import post from './post';

export default curry(function upload(url: string, file: File) {
  const formData = new FormData();
  formData.append('file-0', file);
  return post(url, formData);
});