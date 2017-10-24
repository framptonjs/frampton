import { List } from '@frampton/core';
import {
  depth,
  stack,
} from './signals';

export interface HistoryState {
  id?: number;
  data: any;
  name: string;
  path: string;
}

export interface HistoryStack {
  currentState: any;
  currentId: number;
  _store: Array<any>;
}

/**
 * The current state of the application history.
 *
 * @name stack
 * @private
 * @memberof Frampton.History
 * @type {Object}
 */
export const historyStack: HistoryStack = {
  currentState: null,
  currentId: 0,
  _store: [],
};

/**
 * Pushes a new state onto the application's internal history stack. In doing
 * so it also updates the current depth of the history stack.
 *
 * @name pushHistory
 * @method
 * @private
 * @memberof Frampton.History
 * @param {Object} newState
 */
export function pushHistory(newState: HistoryState): void {
  historyStack._store.push(newState);
  historyStack.currentState = newState;
  historyStack.currentId = newState.id;
  depth.push(historyStack._store.length);
  stack.push(null);
}

/**
 * Replaces the current state on the application's internal history stack.
 *
 * @name replaceHistory
 * @method
 * @private
 * @memberof Frampton.History
 * @param {Object} newState
 */
export function replaceHistory(newState: HistoryState): void {
  historyStack.currentState = newState;
  historyStack.currentId = newState.id;
  stack.push(null);
}

/**
 * Pops the last element from the application's internal history stack. In doing
 * so it also updates the current depth of the history stack.
 *
 * @name popHistory
 * @method
 * @private
 * @memberof Frampton.History
 */
export function popHistory() {
  historyStack._store.pop();
  historyStack.currentState = List.last(historyStack._store);
  historyStack.currentId = ((historyStack.currentState) ? historyStack.currentState.id : 0);

  depth.push(historyStack._store.length);
  stack.push(null);
}
