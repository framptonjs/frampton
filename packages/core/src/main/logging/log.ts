import Frampton from '../environment';


export default function log<T>(msg: T, data?: any): T {
  if (Frampton.isDev()) {
    if (console !== undefined && typeof console.log === 'function') {
      if (data !== undefined) {
        console.log(msg, data);

      } else {
        console.log(msg);
      }
    }
  }

  return msg;
}