import { Html, NodeType, VKeyedChild, RootNode } from '../elements';
import { AttrType, Attributes, Attribute } from '../attributes';
import { EventDef, EventType, EventMessenger, EventPredicate, filterEvent } from '../attributes/events';
import { cachedNode } from '../cached-node';


function filterAttr<T>(predicate: EventPredicate<T>, attr: Attribute<T>): Attribute<T> {
  switch (attr.type) {
    case AttrType.EVENT:
      return {
        type: AttrType.EVENT,
        value: filterEvent(predicate, attr.value)
      };

    default:
      return attr;
  }
}


function filterAttrs<T>(predicate: EventPredicate<T>, attrs: Attributes<T>): Attributes<T> {
  const newAttrs: Attributes<T> = {};

  for (let key in attrs) {
    newAttrs[key] = filterAttr(predicate, attrs[key]);
  }

  return newAttrs;
}


export const filter: <T>(predicate: EventPredicate<T>, node: Html<T>) => Html<T> =
  cachedNode(function <T>(predicate: EventPredicate<T>, node: Html<T>): Html<T> {
    switch (node.type) {
      case NodeType.NODE:
        return {
          type: NodeType.NODE,
          tag: node.tag,
          attrs: filterAttrs(predicate, node.attrs),
          children: node.children.map((child: Html<T>): Html<T> => {
            return filter(predicate, child);
          }),
          domNode: node.domNode
        };

      case NodeType.KEYED_NODE:
        return {
          type: NodeType.KEYED_NODE,
          tag: node.tag,
          attrs: filterAttrs(predicate, node.attrs),
          children: node.children.map((child: VKeyedChild<T>): VKeyedChild<T> => {
            return <VKeyedChild<T>>filter(predicate, child);
          }),
          domNode: node.domNode
        };

      case NodeType.KEYED_CHILD:
        return {
          type: NodeType.KEYED_CHILD,
          key: node.key,
          node: <RootNode<T>>filter(predicate, node.node)
        };

      default:
        return node;
    }
  });