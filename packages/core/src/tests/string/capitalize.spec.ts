import { capitalize } from '../../main/string';
import { assert } from 'chai';


describe("String", function() {
  describe('capitalize', function() {
    it('should capitalize lowercase string', function() {
      const actual = capitalize('test');
      const expected = 'Test';

      assert.equal(actual, expected);
    });

    it('should capitalize an uppercase string', function() {
      const actual = capitalize('TEST');
      const expected = 'Test';

      assert.equal(actual, expected);
    });
  });
});