import isSomething from './is-something';
import isObject from './is-object';
import isDefined from './is-defined';

/**
 * Returns true/false is the object a DomNode
 *
 * @name isNode
 * @method
 * @memberof Frampton.Utils
 * @param {*} obj
 * @returns {Boolean}
 */
export default function is_node(obj: any): boolean {
  return (
    isSomething(obj) &&
    isObject(obj) &&
    isDefined(obj.nodeType) &&
    isDefined(obj.nodeName)
  );
}