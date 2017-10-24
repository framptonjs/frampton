import { AttrType } from './AttrType';


export interface StyleMap {
  [name: string]: string;
}


export interface StyleAttribute {
  type: AttrType.STYLE;
  value: StyleMap;
}


export function style(styleMap: StyleMap): StyleAttribute {
  return {
    type: AttrType.STYLE,
    value: styleMap
  };
}