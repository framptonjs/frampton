import { curry, Curried2Result } from '../utils';


// contains :: String -> String -> Boolean
export default curry(function contains(sub: string, str: string): boolean {
  return (str.indexOf(sub) > -1);
});