import { Effect, Signal, Task } from '@frampton/core';
import { Html } from './elements';
import { scene, Scheduler } from './scene';

export type StateAndEffect<State, Message> =
  [ State, Effect<Message> ];

export interface AppConfig<State, Message> {
  inputs: Array<Signal<Message>>;
  rootElement: Element;
  update(msg: Message, state: State): StateAndEffect<State, Message>;
  view(state: State): Html<Message>;
  init(): StateAndEffect<State, Message>;
}

export function app<State, Message>(config: AppConfig<State, Message>): Signal<State> {

  function update(acc: StateAndEffect<State, Message>, next: Message) {
    const model: State = acc[0];
    return config.update(next, model);
  }

  const messages: Signal<Message> =
    Signal.create<Message>();

  const initialState: StateAndEffect<State, Message> =
    config.init();

  const inputs: Array<Signal<Message>> =
    (config.inputs || []);

  const allInputs: Signal<Message> =
    Signal.merge<Message>(messages, ...inputs);

  const stateAndTasks: Signal<StateAndEffect<State, Message>> =
    allInputs.fold(update, initialState);

  const state: Signal<State> =
    stateAndTasks.map((next: StateAndEffect<State, Message>) => {
      return next[0];
    });

  const initialView: Html<Message> =
    config.view(initialState[0]);

  const schedule: Scheduler<Message> =
    scene(config.rootElement, initialView, Signal.push(messages));

  const html: Signal<Html<Message>> =
    state.map((next) => {
      return config.view(next);
    });

  const tasks: Signal<Effect<Message>> =
    stateAndTasks.map((next: StateAndEffect<State, Message>) => {
      return next[1];
    });

  // Run tasks and publish any resulting events back into messages
  Task.execute(tasks, Signal.push(messages));

  // Render state updates
  html.onValue((tree: Html<Message>) => {
    schedule(tree);
  });

  return state;
}
