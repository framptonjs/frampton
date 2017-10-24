import { at } from '../../main/list';
import { assert } from 'chai';


describe('List', function() {
  describe('at', function() {
    it('should return item at given index', function() {
      const xs: Array<number> = [1,2,3];
      const actual: any = at(1, xs);
      const expected: any = 2;

      assert.equal(actual, expected);
    });

    it('should return null for out-of-bounds index', function() {
      const xs: Array<number> = [1,2,3];
      const actual: any = at(8, xs);
      const expected: any = null;

      assert.equal(actual, expected);
    });
  });
});