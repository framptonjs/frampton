import { Curried2Result, curry, Task } from '@frampton/core';
import { postRequest } from './post';

export const uploadMany = curry((url: string, files: Array<File>) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('file-' + i, files[i]);
  }
  return postRequest(url, formData);
});
