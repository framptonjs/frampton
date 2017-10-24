import { Task, Effect, guid } from '@frampton/core';
import { getHistory } from '../utils';
import { replaceHistory, HistoryState } from '../history-stack';


/**
 * @name replaceState
 * @method
 * @memberof Frampton.History
 * @param {Object} state A state to replace the current state
 */
export default (data: any, name: string, path: string): Effect<void> =>
  Task.create<never,void,never>((sinks) => {
    const state: HistoryState = {
      id: guid(),
      data: data,
      name: name,
      path: path
    };

    getHistory().replaceState(state, state.name, state.path);
    replaceHistory(state);

    sinks.resolve(null);
  });
