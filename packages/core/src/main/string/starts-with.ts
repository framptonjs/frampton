import { curry, Curried2Result } from '../utils';


// starts_with :: String -> String -> Boolean
export default curry(function starts_with(sub: string, str: string): boolean {
  return (str.indexOf(sub) === 0);
});