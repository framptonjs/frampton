import { ofValue } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('ofValue', function() {
    it('should create a function that returns given value', function() {
      const fn = ofValue(5);
      const actual = fn();
      const expected = 5;

      assert.equal(actual, expected);
    });
  });
});