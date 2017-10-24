import queryEscape from './query-escape';

// query_pair :: [String, String] -> String
export default function query_pair(pair: [ string, string ]): string {
  return (queryEscape(pair[0]) + '=' + queryEscape(pair[1]));
}