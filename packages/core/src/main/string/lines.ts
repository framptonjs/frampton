// lines :: String -> Array String
export default function lines(str: string): Array<string> {
  return str.split(/\r\n|\r|\n/g);
}