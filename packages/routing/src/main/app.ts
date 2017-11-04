import { Effect, List, Signal, Task } from '@frampton/core';
import { getLocation, location } from '@frampton/history';
import { Html, scene, Scheduler } from '@frampton/html';

const enum MessageType {
  URL_UPDATE,
  USER_ACTION,
}

interface UrlUpdate {
  type: MessageType.URL_UPDATE;
  location: Location;
}

interface UserAction<Message> {
  type: MessageType.USER_ACTION;
  action: Message;
}

type Action<Message>
  = UrlUpdate
  | UserAction<Message>;

export type StateAndEffect<State, Message> =
  [ State, Effect<Message> ];

export interface AppConfig<State, Message, Route> {
  inputs: Array<Signal<Message>>;
  rootElement: Element;
  update(msg: Message, state: State): StateAndEffect<State, Message>;
  urlUpdate(route: Route, state: State): StateAndEffect<State, Message>;
  urlParser(loc: Location): Route;
  view(state: State): Html<Message>;
  init(route: Route): StateAndEffect<State, Message>;
}

/**
 * {
 *   update : Function,
 *   urlUpdate : Function,
 *   urlParser : Function,
 *   view : Function,
 *   init : Function,
 *   inputs : []
 * }
 */
export function app<State, Message, Route>(config: AppConfig<State, Message, Route>): Signal<State> {

  function update(acc: StateAndEffect<State, Message>, action: Action<Message>): StateAndEffect<State, Message> {
    const model: State = acc[0];
    switch (action.type) {
      case MessageType.URL_UPDATE:
        return config.urlUpdate(config.urlParser(action.location), model);

      case MessageType.USER_ACTION:
        return config.update(action.action, model);
    }
  }

  const messages: Signal<Message> =
    Signal.create<Message>();

  const initialState: StateAndEffect<State, Message> =
    config.init(config.urlParser(getLocation()));

  const inputs: Array<Signal<Message>> =
    (config.inputs || []);

  const userInputs: Signal<UserAction<Message>> =
    Signal.merge<Message>(messages, ...inputs).map((msg: Message): UserAction<Message> => {
      return {
        type: MessageType.USER_ACTION,
        action: msg,
      };
    });

  const locationChanges: Signal<UrlUpdate> =
    location.map((loc: Location): UrlUpdate => {
      return {
        type: MessageType.URL_UPDATE,
        location: loc,
      };
    });

  const allInputs: Signal<Action<Message>> =
    Signal.merge<Action<Message>>(userInputs, locationChanges);

  const stateAndTasks: Signal<StateAndEffect<State, Message>> =
    allInputs.fold(update, initialState);

  const state: Signal<State> =
    stateAndTasks.map((next: StateAndEffect<State, Message>) => {
      return next[0];
    });

  const tasks: Signal<Effect<Message>> =
    stateAndTasks.map((next: StateAndEffect<State, Message>) => {
      return next[1];
    });

  const initialView: Html<Message> =
    config.view(initialState[0]);

  const schedule: Scheduler<Message> =
    scene(config.rootElement, initialView, Signal.push(messages));

  const html: Signal<Html<Message>> = state.map((next: State) => {
    return config.view(next);
  });

  html.onValue(schedule);

  // Run tasks and publish any resulting events back into messages
  Task.execute(tasks, Signal.push(messages));

  return state;
}
