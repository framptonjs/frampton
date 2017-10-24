import { reverse } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('reverse', function() {
    it('should return a new array with values reversed', function() {
      const xs = [1,2,3];
      const actual = reverse(xs);
      const expected = [3,2,1];

      assert.deepEqual(actual, expected);
    });
  });
});