import { apply, FRAMPTON_ENV } from '@frampton/core';

type ProgressEventHandler = (evt?: any) => void;

interface EventListenerMap {
  [name: string]: Array<ProgressEventHandler>;
}

class MockReader implements FileReader {
  public listeners: EventListenerMap;
  public readTime: number;
  public progress: number;
  public timeout: number;
  public progressInterval: number;
  public error: DOMError;
  public onabort: any;
  public onerror: any;
  public onload: any;
  public onloadend: any;
  public onloadstart: any;
  public onprogress: any;
  public readyState: number;
  public result: number;
  public DONE: number;
  public EMPTY: number;
  public LOADING: number;

  constructor() {
    this.listeners = {};
    this.readTime = ((Math.random() * 500) + 300);
    this.progress = 0;
    this.timeout = 10000;
  }

  public abort(): void {}

  public dispatchEvent(evt: Event): boolean {
    return false;
  }

  public read(file: File) {
    this.progressInterval = setInterval(() => {
      if (this.listeners.progress) {
        this.listeners.progress.forEach((next) => {
          this.progress += 15;
          next({
            loaded : ((this.progress / this.readTime) * 500),
            total : 500,
          });
        });
      }
    }, 20);

    setTimeout(() => {

      if (this.progressInterval) {
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      }

      if (this.listeners.load) {
        this.listeners.load.forEach((next) => {
          next({
            target : {
              result: 'test',
            },
          });
        });
      }
    }, this.readTime);

    if (this.listeners.start) {
      this.listeners.start.forEach(apply);
    }
  }

  public addEventListener(name: string, callback: ProgressEventHandler) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    if (this.listeners[name].indexOf(callback) === -1) {
      this.listeners[name].push(callback);
    }
  }

  public removeEventListener(name: string, callback: ProgressEventHandler): void {
    if (this.listeners[name].indexOf(callback) > -1) {
      this.listeners[name] = this.listeners[name].filter((cb: ProgressEventHandler): boolean => {
        return cb === callback;
      });
    }
  }

  public readAsDataURL(file: File) {
    this.read(file);
  }

  public readAsArrayBuffer(file: File) {
    this.read(file);
  }

  public readAsText(file: File) {
    this.read(file);
  }

  public readAsBinaryString(file: File) {
    this.read(file);
  }
}

export function fileReader(): FileReader {
  if (FRAMPTON_ENV.isTest()) {
    return new MockReader();
  } else {
    return new FileReader();
  }
}
