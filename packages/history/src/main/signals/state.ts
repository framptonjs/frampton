import { Signal } from '@frampton/core';
import history from './history';
import { HistoryState } from '../history-stack';


const stateSignal: Signal<HistoryState> =
  history.map((hist: History) => {
    if (hist.state && hist.state.data) {
      return hist.state.data;
    } else {
      return null;
    }
  });


/**
 * A Signal representing the current history.state
 *
 * @name state
 * @property
 * @memberof Frampton.History
 * @type {Frampton.Signal.Signal}
 */
export default stateSignal;
