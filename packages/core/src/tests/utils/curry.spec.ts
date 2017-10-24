import { curry } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('curry', function() {
    it('should create a function that can be applied one argument at a time', function() {
      var count = 0;
      const a = function(x: number, y: number, c: number, d: number) {
        assert.equal(count, 4);
        return (x + y + c + d);
      };

      const b = curry(a);
      count++;

      const c = b(2);
      count++;

      const d = c(3);
      count++;

      const e = d(4);
      count++;

      assert.equal(e(3), 12);
    });

    it('should create a function that can be partially applied', function() {
      var count = 0;
      const a = function(x: number, y: number, c: number, d: number) {
        assert.equal(count, 2);
        return (x + y + c + d);
      };

      const b = curry(a);
      count++;

      const c = b(2, 3);
      count++;

      assert.equal(c(3, 4), 12);
    });
  });
});