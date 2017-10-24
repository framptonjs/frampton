import { queryUnescape } from '../../main/utils';
import { assert } from 'chai';


describe('Utils', function() {
  describe('queryUnescape', function() {
    it('should correctly unescape spaces', function() {
      const params: string = 'some+thing';
      const actual: string = queryUnescape(params);
      const expected: string = 'some thing';

      assert.equal(actual, expected);
    });
  });
});