export interface ObjectMapping<T> {
  [name: string]: T;
}


export default function as_list<T>(obj: ObjectMapping<T>): Array<[string,T]> {
  const result: Array<[string,T]> = [];

  for (let key in obj) {
    result.push([ key, obj[key] ]);
  }

  return result;
}