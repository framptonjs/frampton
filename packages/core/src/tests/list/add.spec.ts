import { add } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('add', function() {
    it('should return new array with value added', function() {
      const xs = [1,2,3];
      const actual = add(xs, 4);
      const expected = [1,2,3,4];

      assert.deepEqual(actual, expected);
    });

    it('should return unaltered array if value exists in array', function() {
      const xs = [1,2,3];
      const actual = add(xs, 3);
      const expected = [1,2,3];

      assert.deepEqual(actual, expected);
    });

    it('should return same reference if value exists', function() {
      const xs = [1,2,3];
      const ys = add(xs, 3);

      assert.equal(xs, ys);
    });

    it('should return new array when adding to array', function() {
      const xs = [1,2,3];
      const ys = add(xs, 4);

      assert.notEqual(xs, ys);
    });
  });
});