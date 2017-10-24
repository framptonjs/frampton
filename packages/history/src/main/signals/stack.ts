import { Signal } from '@frampton/core';


const stackSignal: Signal<void> =
  Signal.create<void>(null);


/**
 * Signal of changes to the history stack
 *
 * @name stack
 * @property
 * @private
 * @memberof Frampton.History.Signals
 * @type {Frampton.Signal.Signal}
 */
export default stackSignal;
