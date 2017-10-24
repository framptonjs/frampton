import { Env } from '@frampton/core';


function createMockLocation(): Location {
  return {
    host: '',
    hostname: '',
    hash: '',
    href: '',
    origin: '',
    port: '',
    protocol: '',
    pathname: '/test/path',
    search: '?test=true',
    assign(url: string): void {},
    reload(forcedReload?: boolean): void {},
    replace(url: string): void {}
  };
}


export default function location_api(): Location {
  if (!window || Env.isTest()) {
    return createMockLocation();
  } else {
    return window.location;
  }
}
