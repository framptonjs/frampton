import { compose } from '@frampton/core';
import { elementValue } from './html';
import eventTarget from './event-target';


/**
 * eventValue :: DomEvent -> String
 *
 * @name eventValue
 * @memberof Frampton.Events
 * @static
 * @param {Object} evt
 * @returns {String} The value property of the event target
 */
export default compose(elementValue, eventTarget);