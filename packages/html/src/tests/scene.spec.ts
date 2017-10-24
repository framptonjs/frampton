import { assert } from 'chai';
import * as Attrs from '../main/attributes/attrs';
import { Html, NodeType, VNode } from '../main/elements';
import * as Elements from '../main/html';
import { scene } from '../main/scene';

describe('scene', () => {
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

  it('should render initial view into DOM', (done) =>  {
    const view: Html<any> =
      Elements.div([ Attrs.id('test-id') ], []);

    const scheduler =
      scene(rootElement, view, () => null);

    setTimeout(() => {
      const actual: number =
        rootElement.querySelectorAll('#test-id').length;

      const expected: number =
        1;

      assert.equal(actual, expected);

      done();
    }, 100);
  });
});
