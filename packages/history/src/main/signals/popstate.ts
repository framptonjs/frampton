import { Signal } from '@frampton/core';
import { onCustom } from '@frampton/events';
import {
  popHistory,
  pushHistory,
  historyStack
} from '../history-stack';


const popstateSignal: Signal<PopStateEvent> =
  onCustom<PopStateEvent>('popstate', window).map((evt) => {
    if (evt.state) {
      if (evt.state.id < historyStack.currentId) {
        popHistory();
      } else if (evt.state.id > historyStack.currentId) {
        pushHistory(evt.state);
      }
    }

    return evt;
  });


/**
 * Returns a Signal of popstate events. Also helps to internally keep track of
 * the current depth of the history stack.
 *
 * @name popstateSignal
 * @method
 * @private
 * @memberof Frampton.History
 * @returns {Frampton.Signal.Siganl}
 */
export default popstateSignal;