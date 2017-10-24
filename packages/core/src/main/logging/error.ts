import Frampton from '../environment';


export default function error<T>(msg: T, data?: any): T {
  if (Frampton.isDev()) {
    if (console !== undefined && typeof console.error === 'function') {
      if (data !== undefined) {
        console.error(msg, data);

      } else {
        console.error(msg);
      }

    } else if (console !== undefined && typeof console.log === 'function') {
      if (data !== undefined) {
        console.log(('Error: ' + msg), data);

      } else {
        console.log(('Error: ' + msg));
      }
    }
  }

  return msg;
}