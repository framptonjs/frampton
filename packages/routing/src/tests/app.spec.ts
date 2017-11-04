import { Effect, Signal, Task } from '@frampton/core';
import { history } from '@frampton/history';
import { Elements, Events, Html } from '@frampton/html';
import { assert } from 'chai';
import { app, StateAndEffect } from '../main/app';

describe('Frampton.Router.app', () => {
  let fixture: HTMLElement;
  let rootElement: HTMLElement;

  beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
    rootElement = document.createElement('div');
    fixture.appendChild(rootElement);
  });

  afterEach(() => {
    fixture.innerHTML = '';
    rootElement = null;
    fixture = null;
  });

  const clickHandler =
    (evt: Event): string => 'click happened';

  interface State {
    count: number;
  }

  const initState =
    (count: number): State => ({
      count,
    });

  it('creates a functioning app', (done) => {
    const inputs = Signal.create<string>();
    let count = 0;

    function init(route: string): StateAndEffect<State, string> {
      assert.equal(route, 'index');
      return [ initState(0), Task.never() ];
    }

    function update(msg: string, state: State): StateAndEffect<State, string> {
      assert.equal(msg, 'first', 'Message incorrect');
      assert.equal(state.count, 0, 'Initial state incorrect');

      switch (msg) {
        case 'first':
          count ++;
          const newState: State = initState(state.count + 1);
          return [ newState, Task.never() ];

        default:
          return [ state, Task.never() ];
      }
    }

    function view(state: State): Html<string> {
      assert.equal(state.count, count);
      if (state.count > 1) { done(); }
      return Elements.div([ Events.onClick(clickHandler) ], [
        Elements.text('click me'),
      ]);
    }

    function urlParser(loc: Location): string {
      assert.ok(typeof loc.pathname === 'string');
      assert.ok(typeof loc.hash === 'string');
      assert.ok(typeof loc.search === 'string');
      return 'index';
    }

    function urlUpdate(route: string, state: State): StateAndEffect<State, string> {
      count ++;
      const newState = initState(state.count + 1);
      return [ newState, Task.never() ];
    }

    app<State, string, string>({
      init,
      update,
      urlParser,
      urlUpdate,
      view,
      inputs: [ inputs ],
      rootElement,
    });

    inputs.push('first');

    setTimeout(() => {
      history.push({ state: null } as any);
    }, 1000);
  });
});
