import { Attribute } from './attributes';
import {
  NodeKey,
  RootNode,
  VKeyedNode,
  vKeyedNode,
  vNode,
} from './elements';

// A node whose children can be reordered
export const parent =
  <T>(
    tag: string,
    attrs: Array<Attribute<T>>,
    children: Array<[ NodeKey, RootNode<T> ]>,
  ): VKeyedNode<T> => vKeyedNode(tag, attrs, children);

// A child of keyed parent
export const child =
  <T>(
    tag: string,
    key: NodeKey,
    attrs: Array<Attribute<T>> = [],
    children: Array<RootNode<T>> = [],
  ): [ NodeKey, RootNode<T> ] => [ key, vNode(tag, attrs, children) ];

export const ol =
  <T>(
    attrs: Array<Attribute<T>>,
    children: Array<[ NodeKey, RootNode<T> ]>,
  ): VKeyedNode<T> => vKeyedNode('ol', attrs, children);

export const ul =
  <T>(
    attrs: Array<Attribute<T>>,
    children: Array<[ NodeKey, RootNode<T> ]>,
  ): VKeyedNode<T> => vKeyedNode('ul', attrs, children);

export const li =
  <T>(
    key: NodeKey,
    attrs: Array<Attribute<T>> = [],
    children: Array<RootNode<T>> = [],
  ): [ NodeKey, RootNode<T> ] => child('li', key, attrs, children);
