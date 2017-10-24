import { isEmpty } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('isEmpty', function() {
    it('should return true for Arrays with lenght 0', function() {
      const actual = isEmpty([]);
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return true for Strings with length 0', function() {
      const actual = isEmpty('');
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return true for Strings with only whitespace', function() {
      const actual = isEmpty('   ');
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return true for null', function() {
      const actual = isEmpty(null);
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return true for undefined', function() {
      const actual = isEmpty(undefined);
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return false for Arrays with length > 0', function() {
      const actual = isEmpty([1,2,3,4]);
      const expected = false;

      assert.equal(actual, expected);
    });

    it('should return false for Stings with length > 0', function() {
      const actual = isEmpty('test');
      const expected = false;

      assert.equal(actual, expected);
    });
  });
});