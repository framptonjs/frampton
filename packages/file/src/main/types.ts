export type ReadMethod =
'DATA_URL' | 'ARRAY_BUFFER' | 'TEXT' | 'BINARY_STRING';

export interface Response {
  status: string;
  timestamp: number;
  progress: number;
  complete: boolean;
  data: any;
}
