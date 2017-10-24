export default function dash_to_camel(str: string): string {
  return str.replace(/-([a-z])/g, function(m: string, w: string): string {
    return w.toUpperCase();
  });
}