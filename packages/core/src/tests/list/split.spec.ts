import { split } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('split', function() {
    it('should split an array at given index, returning two new arrays', function() {
      const xs = [1,2,3,4,5,6];
      const actual = split(3, xs);
      const expected = [[1,2,3],[4,5,6]];

      assert.deepEqual(actual, expected);
    });
  });
});