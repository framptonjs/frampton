import { asList } from '../../main/object';
import { assert } from 'chai';


describe('Object', function() {
  describe('asList', function() {
    it('should return a list of [ key, value ] pairs for object', function() {
      const map = { one : 1, two : 2, three : 3 };
      const actual = asList(map);
      const expected = [['one',1], ['two',2], ['three',3]];

      assert.deepEqual(actual, expected);
    });
  });
});