import { history } from '../../main/signals';
import { getHistory } from '../../main/utils';
import { assert } from 'chai';


describe('Signals', function() {
  describe('history', function() {
    it('should return Signal with correct initial value', function() {
      const actual: History = history.get();
      const expected: History = getHistory();

      assert.equal(actual.state, expected.state);
      assert.equal(actual.length, expected.length);
      assert.equal(actual.scrollRestoration, expected.scrollRestoration);
    });
  });
});