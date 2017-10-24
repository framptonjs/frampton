import { curry, Curried2Result } from '../utils';


// split :: String -> String -> Array String
export default curry(function join(sep: string, str: string): Array<string> {
  return str.split(sep);
});