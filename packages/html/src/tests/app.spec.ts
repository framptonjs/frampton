import { Effect, Signal, Task } from '@frampton/core';
import { assert } from 'chai';
import { app, Elements, Events, Html } from '../main/index';

const { div, text } = Elements;
const { onClick } = Events;

interface MockState {
  count: number;
}

describe('app', () => {
  let container: Element = null;
  let rootElement: Element = null;

  beforeEach(() => {
    container = document.body;
    rootElement = document.createElement('div');
    container.appendChild(rootElement);
  });

  afterEach(() => {
    container.removeChild(rootElement);
    rootElement = null;
    container = null;
  });

  const clickHandler =
    (evt: Event): string => 'click happened';

  const initState =
    (count: number): MockState => ({
      count,
    });

  it('should create a functioning app', (done) => {
    const inputs: Signal<string> =
      Signal.create<string>();

    let count: number =
      0;

    function init(): [ MockState, Effect<string> ] {
      return [ initState(0), Task.never() ];
    }

    function update(msg: string, state: MockState): [ MockState, Effect<string> ] {
      assert.equal(msg, 'first', 'Message incorrect');
      assert.equal(state.count, 0, 'Initial state incorrect');

      switch (msg) {
        case 'first':
          count ++;
          const newState: MockState =
            initState(state.count + 1);

          return [ newState, Task.never() ];

        default:
          return [ state, Task.never() ];
      }
    }

    function view(state: MockState): Html<string> {
      assert.equal(state.count, count);
      if (state.count > 0) { done(); }

      return div([ onClick(clickHandler) ], [
        text('click me'),
      ]);
    }

    app({
      init,
      update,
      view,
      inputs: [ inputs ],
      rootElement,
    });

    inputs.push('first');
  });

});
