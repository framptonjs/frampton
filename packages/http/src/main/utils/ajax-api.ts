import { FRAMPTON_ENV, apply } from '@frampton/core';

interface ProgressEventHandler {
  (evt?: any): void;
}

interface EventListenerMap {
  [name: string]: Array<ProgressEventHandler>
}

interface RequestHeaders {
  [anme: string]: string | Array<string> | number | undefined
}

class MockAjax implements XMLHttpRequest {
  method: string;
  url: string;
  listeners: EventListenerMap;
  headers: RequestHeaders;
  requestTime: number;
  progress: number;
  timeout: number;
  progressInterval: number;
  onreadystatechange: any;
  onabort: any;
  onerror: any;
  onload: any;
  onloadend: any;
  onloadstart: any;
  onprogress: any;
  ontimeout: any;
  readyState: any;
  response: any;
  responseText: string;
  responseType: XMLHttpRequestResponseType;
  responseURL: string;
  responseXML: Document;
  status: number;
  statusText: string;
  upload: XMLHttpRequestUpload;
  withCredentials: boolean;
  DONE: number;
  HEADERS_RECEIVED: number;
  LOADING: number;
  OPENED: number;
  UNSENT: number;

  constructor() {
    this.method = 'GET';
    this.url = '';
    this.listeners = {};
    this.headers = {};
    this.requestTime = ((Math.random() * 1000) + 300);
    this.progress = 0;
    this.timeout = 10000;
  }

  dispatchEvent(evt: Event): boolean {
    return false
  }

  getAllResponseHeaders(): string {
    return '';
  }

  getResponseHeader(): string {
    return '';
  }

  msCachingEnabled(): boolean {
    return false;
  }

  overrideMimeType(): boolean {
    return false;
  }

  abort(): void {}

  open(method: string, url: string): void {
    this.method = method;
    this.url = url;
  }

  send(): void {
    this.progressInterval = setInterval(() => {
      if (this.listeners['progress']) {
        this.listeners['progress'].forEach((next) => {
          this.progress += 15;
          next({
            lengthComputable: true,
            loaded : ((this.progress/this.requestTime) * 500),
            total : 500
          });
        });
      }
    }, 20);

    setTimeout(() => {

      const methodUrl = `${this.method}:${this.url}`;
      const methodResponse = FRAMPTON_ENV.mock(methodUrl);
      const baseResponse = FRAMPTON_ENV.mock(this.url);
      const data = (methodResponse || baseResponse || 'test');

      if (this.progressInterval) {
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      }

      if (this.listeners['load']) {
        this.listeners['load'].forEach((next) => {
          next({
            target: {
              response: data,
              status: 200
            },
            total: 500,
            loaded: 500
          });
        });
      }
    }, this.requestTime);

    if (this.listeners['start']) {
      this.listeners['start'].forEach(apply);
    }
  }

  addEventListener(name: string, callback: ProgressEventHandler): void {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    if (this.listeners[name].indexOf(callback) === -1) {
      this.listeners[name].push(callback);
    }
  }

  removeEventListener(name: string, callback: ProgressEventHandler): void {
    if (this.listeners[name].indexOf(callback) > -1) {
      this.listeners[name] = this.listeners[name].filter((cb: ProgressEventHandler): boolean => {
        return cb === callback
      })
    }
  }

  setRequestHeader(key: string, value: string | Array<string> | number): void {
    this.headers[key] = value;
  }
}

/**
 * Returns either an instance of XMLHttpRequest or a mock instance if in testing mode.
 *
 * @name ajaxApi
 * @method
 * @memberof Frampton.IO.Http
 * @returns {Object} Instance of XMLHttpRequest for current environment
 */
export default function ajax_api(): XMLHttpRequest {
  if (FRAMPTON_ENV.isTest()) {
    return new MockAjax();
  } else {
    return new XMLHttpRequest();
  }
}
