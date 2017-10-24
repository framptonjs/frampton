import { cached } from '../../main/utils';
import { assert } from 'chai';


describe('Utils', function() {
  describe('cached', function() {
    it('should return a function', function() {
      const cachedFn = cached(function(key: string): number {
        return 5;
      });

      assert.ok(typeof cachedFn === 'function');
    });

    it('should apply function if no cached value', function() {
      var count = 0;
      const cachedFn = cached(function(key: string): number {
        return count += 1;
      });

      assert.equal(cachedFn('test'), 1);
    });

    it('should not apply function if cached value', function() {
      var count = 0;
      const cachedFn = cached(function(key: string): number {
        return count += 1;
      });

      assert.equal(cachedFn('test'), 1);
      assert.equal(cachedFn('test'), 1);
      assert.equal(cachedFn('another'), 2);
    });
  });
});