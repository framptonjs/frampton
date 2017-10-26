import {
  isArray,
  isObject,
  isSomething,
  join,
} from '@frampton/core';

import { queryEscape } from './query-escape';

function encode(prefix: string, obj: any, add: any): void {
  if (isArray(obj)) {

    for (let i=0;i<obj.length;i++) {

      encode(
        prefix + '[]',
        obj[i],
        add
      );
    }

  } else if (isObject(obj)) {

    for (let key in obj) {

      encode(
        prefix + '[' + key + ']',
        obj[key],
        add
      );

    }

  } else {
    add(prefix, obj);
  }
}

export function queryString(args: Array<string>) {
  const params: Array<string> = [];

  function add(key: string, value: string): void {
    if (isSomething(value)) {
      params[params.length] = (queryEscape(key) + '=' + queryEscape(value));
    }
  }

  for (let key in args) {
    encode(key, args[key], add);
  }

  return join('&', params);
}