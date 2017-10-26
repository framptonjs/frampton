import { Curried2Result, curry, Task } from '@frampton/core';
import { postRequest } from './post';

export const upload = curry((url: string, file: File) => {
  const formData = new FormData();
  formData.append('file-0', file);
  return postRequest(url, formData);
});
