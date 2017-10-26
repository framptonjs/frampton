import { queryEscape } from './query-escape';

// query_pair :: [String, String] -> String
export function queryPair(pair: [ string, string ]): string {
  return (queryEscape(pair[0]) + '=' + queryEscape(pair[1]));
}