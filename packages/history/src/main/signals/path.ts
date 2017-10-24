import { Signal } from '@frampton/core';
import location from './location';


const pathSignal: Signal<string> =
  location.map(loc => loc.pathname);


/**
 * A Signal representing the current location.pathname
 *
 * @name path
 * @property
 * @memberof Frampton.History
 * @type {Frampton.Signal.Signal}
 */
export default pathSignal;
