import { Effect, Signal, Task } from './data';

export type StateAndEffect<S, M> =
  [ S, Effect<M> ];

export interface AppConfig<S, M> {
  inputs: Array<Signal<M>>;
  init(): StateAndEffect<S, M>;
  update(msg: M, state: S): StateAndEffect<S, M>;
}

export function app<S, M>(config: AppConfig<S, M>): Signal<S> {

  function update(acc: StateAndEffect<S, M>, next: M) {
    const model: S = acc[0];
    return config.update(next, model);
  }

  const messages: Signal<M> =
    Signal.create<M>();

  const initialState: StateAndEffect<S, M> =
    config.init();

  const inputs: Array<Signal<M>> =
    (config.inputs || []);

  const allInputs: Signal<M> =
    Signal.merge<M>(messages, ...inputs);

  const stateAndTasks: Signal<StateAndEffect<S, M>> =
    allInputs.fold(update, initialState);

  const state: Signal<S> =
    stateAndTasks.map((next: StateAndEffect<S, M>) => {
      return next[0];
    });

  const tasks: Signal<Effect<M>> =
    stateAndTasks.map((next: StateAndEffect<S, M>) => {
      return next[1];
    });

  // Run tasks and publish any resulting events back into messages
  Task.execute(tasks, Signal.push(messages));

  return state;
}
