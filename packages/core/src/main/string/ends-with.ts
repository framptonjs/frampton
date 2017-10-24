import { curry, Curried2Result } from '../utils';


// ends_with :: String -> String -> Boolean
export default curry(function ends_with(sub: string, str: string): boolean {
  return (
    (str.length >= sub.length) &&
    (str.lastIndexOf(sub) === (str.length - sub.length))
  );
});
