import { zip } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('zip', function() {
    it('should combine two arrays into an array of pairs', function() {
      const xs = [1,2,3];
      const ys = [4,5,6];
      const actual = zip(xs,ys);
      const expected = [[1,4],[2,5],[3,6]];

      assert.deepEqual(actual, expected);
    });
  });
});