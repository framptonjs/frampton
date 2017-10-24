import { curry, Curried2Result, Task } from '@frampton/core';
import post from './post';

export default curry(function upload(url: string, files: Array<File>) {
  const formData = new FormData();
  for (let i=0; i<files.length; i++) {
    formData.append('file-' + i, files[i]);
  }
  return post(url, formData);
});
