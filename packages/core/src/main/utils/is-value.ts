export default function is_value(test: any): (val: any) => boolean {
  return function(val: any): boolean {
    return (val === test);
  };
}