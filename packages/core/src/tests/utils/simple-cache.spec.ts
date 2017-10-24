import { simpleCache } from '../../main/utils';
import { assert } from 'chai';


describe('Utils', function() {
  describe('simpleCache', function() {
    it('should return a function', function() {
      const cache = simpleCache();

      assert.ok(typeof cache === 'function');
    });

    it('should apply function if no cached value', function() {
      var count = 0;
      const cache = simpleCache();
      const val = cache('test', () => {
        count += 1;
        return 3;
      });

      assert.equal(val, 3);
      assert.equal(count, 1);
    });

    it('should not apply function if value in cache', function() {
      var count = 0;
      const cache = simpleCache();
      const val1 =
        cache('test', () => {
          count += 1;
          return 3;
        });

      const val2 =
        cache('test', () => {
          count += 1;
          return 4;
        });

      assert.equal(val1, 3);
      assert.equal(val2, 3);
      assert.equal(count, 1);
    });
  });
});