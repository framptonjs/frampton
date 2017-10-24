import { Signal } from '@frampton/core';


const depthSignal: Signal<number> =
  Signal.create(0);


/**
 * A Signal representing the current depth of application history
 *
 * @name depth
 * @property
 * @memberof Frampton.History.Signals
 * @type {Frampton.Signal.Signal}
 */
export default depthSignal;
