import { hasLength } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('hasLength', function() {
    it('should return true for Arrays with given length', function() {
      const actual = hasLength(3, [1,2,3,4]);
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return true for Strings with given length', function() {
      const actual = hasLength(3, 'five');
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return false for Arrays with length less than test', function() {
      const actual = hasLength(7, [1,2,3,4]);
      const expected = false;

      assert.equal(actual, expected);
    });
  });
});