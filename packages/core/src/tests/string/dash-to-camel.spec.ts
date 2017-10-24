import { dashToCamel } from '../../main/string';
import { assert } from 'chai';


describe("String", function() {
  describe('dashToCamel', function() {
    it('should change dash case to camel case', function() {
      const actual = dashToCamel('test-test-camel');
      const expected = 'testTestCamel';

      assert.equal(actual, expected);
    });

    it('should return non-dashed strings unalterned', function() {
      const actual = dashToCamel('thisIsTest');
      const expected = 'thisIsTest';

      assert.equal(actual, expected);
    });
  });
});