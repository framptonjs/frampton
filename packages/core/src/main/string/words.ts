// words :: String -> Array String
export default function words(str: string): Array<string> {
  return str.trim().split(/\s+/g);
}