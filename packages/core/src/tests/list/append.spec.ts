import { append } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('append', function() {
    it('should return new array with value added', function() {
      const xs = [1,2,3];
      const actual = append(xs, 4);
      const expected = [1,2,3,4];

      assert.deepEqual(actual, expected, 'has correct values');
    });

    it('should return new reference', function() {
      const xs = [1,2,3];
      const ys = append(xs, 4);

      assert.notEqual(xs, ys, 'is not the same reference');
    });
  });
});