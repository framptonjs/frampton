import { Signal } from '@frampton/core';
import { getLocation } from '../utils';
import history from './history';


const locationSignal: Signal<Location> =
  history.map(() => getLocation());


/**
 * @name locationSignal
 * @property
 * @private
 * @memberof Frampton.History.Signals
 * @type {Frampton.Signal.Signal}
 */
export default locationSignal;
