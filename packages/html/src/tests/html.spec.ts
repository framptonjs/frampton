import { assert } from 'chai';
import { Html, NodeType, VNode } from '../main/elements';
import * as Dom from '../main/html';

describe('Html', () => {
  describe('div', () => {
    it('should create empty div', () => {
      const actual: Html<any> = Dom.div([], []);
      const expected: VNode<void> = {
        type: NodeType.NODE,
        tag: 'div',
        attrs: {},
        children: [],
        domNode: undefined,
      };

      assert.deepEqual(actual, expected);
    });
  });
});
