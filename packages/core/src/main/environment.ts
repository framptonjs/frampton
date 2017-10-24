declare var global: any;

declare var window: any;

const env: any =
  (global !== undefined) ? global :
    (window !== undefined) ? window :
      {};

export type EnvMode =
  'test' | 'dev' | 'prod';

if (typeof env.__Frampton === 'undefined') {
  env.__Frampton = {};
}

env.__Frampton.TEST = 'test';

env.__Frampton.DEV = 'dev';

env.__Frampton.PROD = 'prod';

if (typeof env.__Frampton.ENV === 'undefined') {
  env.__Frampton.ENV = {};
}

if (typeof env.__Frampton.ENV.MODE === 'undefined') {
  env.__Frampton.ENV.MODE = env.__Frampton.PROD;
}

if (typeof env.__Frampton.ENV.MOCK === 'undefined') {
  env.__Frampton.ENV.MOCK = {};
}

export default {
  TEST: 'test',

  DEV: 'dev',

  PROD: 'prod',

  mock(key: string): any {
    return (
      (env.__Frampton.ENV.MOCK && env.__Frampton.ENV.MOCK[key]) ?
        env.__Frampton.ENV.MOCK[key] :
        null
    );
  },

  setMode(mode: EnvMode): void {
    env.__Frampton.ENV.MODE = mode;
  },

  isDev(): boolean {
    return (env.__Frampton.ENV.MODE === env.__Frampton.DEV);
  },

  isTest(): boolean {
    return (env.__Frampton.ENV.MODE === env.__Frampton.TEST);
  },

  isProd(): boolean {
    return (env.__Frampton.ENV.MODE === env.__Frampton.PROD);
  },
};
