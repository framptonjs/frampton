import { Env } from '@frampton/core';
import getLocation from './get-location';


export interface HistoryState {
  state: any;
  title: string;
  url: string;
}


function createMockHistory(): History {
  const stack: Array<HistoryState> = [];
  var currentIndex: number = 0;

  return {
    state: null,
    length: 0,
    go(delta?: number): void {},
    back(): void {},
    forward(): void {},
    pushState(data: any, title: string, url?: string): void {
      currentIndex ++;
      getLocation().pathname = url;
      stack.push({
        state: data,
        title: title,
        url: url
      });
    },
    replaceState(data: any, title: string, url?: string): void {
      getLocation().pathname = url;
      stack[currentIndex] = {
        state: data,
        title: title,
        url: url
      };
    },
    scrollRestoration: 'auto'
  };
}


export default function history_api(): History {
  if (!window || Env.isTest()) {
    return createMockHistory();
  } else {
    return window.history;
  }
}
