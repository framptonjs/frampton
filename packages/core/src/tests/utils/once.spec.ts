import { once } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('once', function() {
    it('should create a function that can only be called once', function() {
      var count = 0;
      const fn = once(function() {
        count++;
        return 5;
      });

      assert.equal(fn(), 5);
      assert.equal(count, 1);

      assert.equal(fn(), undefined);
      assert.equal(fn(), undefined);
      assert.equal(fn(), undefined);

      assert.equal(count, 1);
    });
  });
});