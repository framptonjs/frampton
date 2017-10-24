import { diff } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('diff', function() {
    it('should return array of all values from first array not in second', function() {
      const xs = [8,6,9,1,0,3];
      const ys = [8,5,1,9,2];
      const actual = diff(xs, ys);
      const expected = [6,0,3];

      assert.deepEqual(actual, expected);
    });
  });
});