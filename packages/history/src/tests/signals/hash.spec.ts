import { hash } from '../../main/signals';
import { assert } from 'chai';


describe('Signals', function() {
  describe('hash', function() {
    it('should return Signal with initial value of empty string', function() {
      const actual: string = hash.get();
      const expected: string = '';

      assert.equal(actual, expected);
    });
  });
});