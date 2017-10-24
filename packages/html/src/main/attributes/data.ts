import { AttrType } from './AttrType';


export interface DataMap {
  [name: string]: string;
}


export interface DataAttribute {
  type: AttrType.DATA;
  value: DataMap;
}


export function data(dataMap: DataMap): DataAttribute {
  return {
    type: AttrType.DATA,
    value: dataMap
  };
}