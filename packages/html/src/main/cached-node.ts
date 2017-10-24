import { Html } from './elements';

function isArgsEqual(oldArgs: Array<any>, newArgs: Array<any>): boolean {
  const oldLen = oldArgs.length;
  const newLen = newArgs.length;

  if (oldLen !== newLen) {
    return false;
  } else {
    for (let i = 0; i < oldLen; i++) {
      const oldItem = oldArgs[i];
      const newItem = newArgs[i];
      if (oldItem !== newItem) {
        return false;
      }
    }
  }

  return true;
}

export function cachedNode<T>(fn: (...args: Array<any>) => Html<T>) {
  let prevArgs: Array<any> = [];
  let savedHtml: Html<T> = null;

  return (...args: Array<any>): Html<T> => {
    if (savedHtml === null || !isArgsEqual(prevArgs, args)) {
      savedHtml = fn(...args);
    }

    prevArgs = args;
    return savedHtml;
  };
}
