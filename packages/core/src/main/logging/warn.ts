import Frampton from '../environment';


export default function warn<T>(msg: T, data?: any): T {
  if (Frampton.isDev()) {
    if (console !== undefined && typeof console.warn === 'function') {
      if (data !== undefined) {
        console.warn(msg, data);

      } else {
        console.warn(msg);
      }

    } else if (console !== undefined && typeof console.log === 'function') {
      if (data !== undefined) {
        console.log(('Warn: ' + msg), data);

      } else {
        console.log(('Warn: ' + msg));
      }
    }
  }

  return msg;
}