import { contains } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('contains', function() {
    it('should return true if array contains value', function() {
      const xs = [1,2,3];
      const actual = contains(xs, 3);
      const expected = true;

      assert.equal(actual, expected)
    });

    it('should return false if array does not contain value', function() {
      const xs = [1,2,3];
      const actual = contains(xs, 6);
      const expected = false;

      assert.equal(actual, expected)
    });
  });
});