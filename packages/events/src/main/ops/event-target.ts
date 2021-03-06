/**
 * eventTarget :: Event -> HTMLElement
 *
 * @name eventTarget
 * @memberof Frampton.Events
 * @static
 * @param {Object} evt
 * @returns {Object} The target value of the event object, usually a DomNode
 */
export default function event_target(evt: Event): HTMLElement {
  return <HTMLElement>evt.target;
}