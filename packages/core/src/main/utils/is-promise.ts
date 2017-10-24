import isObject from './is-object';


export default (obj: any): boolean => (
  isObject(obj) &&
  typeof obj.then === 'function'
);