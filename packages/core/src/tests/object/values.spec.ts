import { values } from '../../main/object';
import { assert } from 'chai';


describe('Object', function() {
  describe('values', function() {
    it('should return array of object values', function() {
      const obj: any = { one: 1, two: 2, three: 3 };
      const actual: Array<any> = values(obj);
      const expected: Array<number> = [1, 2, 3];

      assert.deepEqual(actual, expected);
    });

    it('should return empty array for null', function() {
      const obj: any = null;
      const actual: Array<any> = values(obj);
      const expected: Array<any> = [];

      assert.deepEqual(actual, expected);
    });
  });
});