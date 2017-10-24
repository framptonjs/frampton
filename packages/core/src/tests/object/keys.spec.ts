import { keys } from '../../main/object';
import { assert } from 'chai';


describe('Object', function() {
  describe('keys', function() {
    it('should return array of object keys', function() {
      const map: any = { one : 1, two : 2, three : 3 };
      const actual: Array<string> = keys(map);
      const expected: Array<string> = ['one', 'two', 'three'];

      assert.deepEqual(actual, expected);
    });

    it('should not return keys on object prototype', function() {
      const map: any = { one : 1, two : 2, three : 3 };
      const map2: any = Object.create(map);

      map2.four = 4;
      map2.five = 5;
      map2.six = 6;

      const actual: Array<string> = keys(map2);
      const expected: Array<string> = ['four', 'five', 'six'];

      assert.deepEqual(actual, expected);
    });

    it('should return emtpy array for null', function() {
      const map: any = null;
      const actual: Array<string> = keys(map);
      const expected: Array<string> = [];

      assert.deepEqual(actual, expected);
    });
  });
});
