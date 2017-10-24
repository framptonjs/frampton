import { Signal } from '@frampton/core';
import { getHistory } from '../utils';
import stack from './stack';
import popstate from './popstate';


const historySignal: Signal<History> =
  stack.merge(popstate.map(null)).map(() => {
    return getHistory();
  });


/**
 * Returns a Signal of the current window.history
 *
 * @name historySignal
 * @method
 * @private
 * @memberof Frampton.History.Signals
 * @returns {Frampton.Signal.Signal}
 */
export default historySignal;
