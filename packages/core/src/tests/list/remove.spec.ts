import { remove } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('remove', function() {
    it('should return a new array with the given value removed', function() {
      const xs = [1,2,3];
      const actual = remove(1, xs);
      const expected = [2, 3];

      assert.deepEqual(actual, expected);
    });
  });
});