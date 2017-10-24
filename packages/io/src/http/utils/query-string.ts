import isArray from 'frampton-utils/is_array';
import isObject from 'frampton-utils/is_object';
import isSomething from 'frampton-utils/is_something';
import join from 'frampton-string/join';
import queryEscape from 'frampton-io/http/utils/query_escape';

function encode(prefix, obj, add) {

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

export default function query_string(args) {

  var params = [];

  function add(key, value) {
    if (isSomething(value)) {
      params[params.length] = (queryEscape(key) + '=' + queryEscape(value));
    }
  }

  for (let key in args) {
    encode(key, args[key], add);
  }

  return join('&', params);
}