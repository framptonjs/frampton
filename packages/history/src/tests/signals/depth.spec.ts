import { depth } from '../../main/signals';
import { assert } from 'chai';


describe('Signals', function() {
  describe('depth', function() {
    it('should return Signal with initial value of 0', function() {
      const actual: number = depth.get();
      const expected: number = 0;

      assert.equal(actual, expected);
    });
  });
});