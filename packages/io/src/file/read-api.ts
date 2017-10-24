import Frampton from 'frampton/namespace';
import apply from 'frampton-utils/apply';

class MockReader {
  listeners: any;
  readTime: number;
  progress: number;
  timeout: number;

  constructor() {
    this.listeners = {};
    this.readTime = ((Math.random() * 3000) + 300);
    this.progress = 0;
    this.timeout = 10000;
  }

  read() {
    this.progressInterval = setInterval(() => {
      if (this.listeners['progress']) {
        this.listeners['progress'].forEach((next) => {
          this.progress += 15;
          next({
            loaded : ((this.progress/this.readTime) * 500),
            total : 500
          });
        });
      }
    }, 20);

    setTimeout(() => {

      if (this.progressInterval) {
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      }

      if (this.listeners['load']) {
        this.listeners['load'].forEach((next) => {
          next({
            target : {
              result: 'test'
            }
          });
        });
      }
    }, this.readTime);

    if (this.listeners['start']) {
      this.listeners['start'].forEach(apply);
    }
  }

  addEventListener(name: string: callback: any) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    if (this.listeners[name].indexOf(callback) === -1) {
      this.listeners[name].push(callback);
    }
  }

  readAsDataURL(file) {
    this.read(file);
  }

  readAsArrayBuffer(file) {
    this.read(file);
  }

  readAsText(file) {
    this.read(file);
  }

  readAsBinaryString(file) {
    this.read(file);
  }
}


export default function ajax() {
  if (Frampton.isTest()) {
    return new MockReader();
  } else {
    return new FileReader();
  }
}
