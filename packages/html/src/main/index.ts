import * as StaticAttributes from './attributes/attrs';
import * as StaticEvents from './attributes/events';
import { checked, innerHTML, Property, selected, value } from './attributes/props';
import * as StaticHtml from './html';
import * as StaticKeyed from './keyed';

export const Elements = StaticHtml;
export const Keyed = StaticKeyed;
export const Events = StaticEvents;
export const Attrs = StaticAttributes;

export const Props = {
  innerHTML,
  value,
  checked,
  selected,
};

export {
  Attribute,
  Attributes,
  Property,
  ClassAttribute,
  EventAttribute,
  DataAttribute,
  StyleAttribute,
} from './attributes';

export {
  VNode, VKeyedNode, VKeyedChild, EventMap,
  EventNode, NodeKey, RootNode, VText, Html,
} from './elements';

export { scene, Scheduler } from './scene';
export { makeRuntime as Runtime } from './runtime';
export { render } from './ops/render';
export { diff } from './diff';
export { AppConfig, app } from './app';
