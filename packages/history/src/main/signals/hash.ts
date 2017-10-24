import { Signal } from '@frampton/core';
import { getLocation } from '../utils';
import location from './location';


const hashSignal: Signal<string> =
  location.map(loc => loc.hash.replace('#', ''));

/**
 * A Signal representing the current location.hash
 *
 * @name hash
 * @property
 * @memberof Frampton.History
 * @type {Frampton.Signal.Signal}
 */
export default hashSignal;
