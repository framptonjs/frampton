export interface RequestSettings {
  timeout: number;
}

export type RequestMethod
  = 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export interface RequestHeaders {
  [name: string]: string;
}

export interface Request {
  url: string;
  timestamp: number;
  method: RequestMethod;
  body: any;
  headers: RequestHeaders;
}

export interface Response {
  status: string;
  timestamp: number;
  progress: number;
  complete: boolean;
  data: any;
}
