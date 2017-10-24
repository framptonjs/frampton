import { Html, NodeType, VKeyedChild, RootNode } from '../elements';
import { AttrType, Attributes, Attribute } from '../attributes';
import { EventDef, EventType, debounceEvent } from '../attributes/events';
import { cachedNode } from '../cached-node';


function debounceAttr<T>(delay: number, attr: Attribute<T>): Attribute<T> {
  switch (attr.type) {
    case AttrType.EVENT:
      return {
        type: AttrType.EVENT,
        value: debounceEvent(delay, attr.value)
      };

    default:
      return attr;
  }
}


function debounceAttrs<T>(delay: number, attrs: Attributes<T>): Attributes<T> {
  const newAttrs: Attributes<T> = {};

  for (let key in attrs) {
    newAttrs[key] = debounceAttr(delay, attrs[key]);
  }

  return newAttrs;
}


export const debounce: <T>(delay: number, node: Html<T>) => Html<T> =
  cachedNode(function <T>(delay: number, node: Html<T>): Html<T> {
    switch (node.type) {
      case NodeType.NODE:
        return {
          type: NodeType.NODE,
          tag: node.tag,
          attrs: debounceAttrs(delay, node.attrs),
          children: node.children.map((child: Html<T>): Html<T> => {
            return debounce(delay, child);
          }),
          domNode: node.domNode
        };

      case NodeType.KEYED_NODE:
        return {
          type: NodeType.KEYED_NODE,
          tag: node.tag,
          attrs: debounceAttrs(delay, node.attrs),
          children: node.children.map((child: VKeyedChild<T>): VKeyedChild<T> => {
            return <VKeyedChild<T>>debounce(delay, child);
          }),
          domNode: node.domNode
        };

      case NodeType.KEYED_CHILD:
        return {
          type: NodeType.KEYED_CHILD,
          key: node.key,
          node: <RootNode<T>>debounce(delay, node.node)
        };

      default:
        return node;
    }
  });