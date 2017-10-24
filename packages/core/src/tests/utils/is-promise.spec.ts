import { isPromise } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('isPromise', function() {
    it('should return false for null', function() {
      const actual = isPromise(null);
      const expected = false;

      assert.equal(actual, expected);
    });

    it('should return false for {}', function() {
      const actual = isPromise({});
      const expected = false;

      assert.equal(actual, expected);
    });

    it('should return false for a Promise instance', function() {
      const actual = isPromise((new Promise((reject, resolve) => {})));
      const expected = true;

      assert.equal(actual, expected);
    });
  });
});