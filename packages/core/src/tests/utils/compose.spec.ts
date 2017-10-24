import { compose } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('compose', function() {
    it('should compose functions right to left', function() {
      const a = function(x: string) { return (x + 'a'); };
      const b = function(x: string) { return (x + 'b'); };

      const actual = compose(a, b)('c');
      const expected = 'cba';

      assert.equal(actual, expected);
    });

    it('should not compose functions left to right', function() {
      const a = function(x: string) { return (x + 'a'); };
      const b = function(x: string) { return (x + 'b'); };

      const actual = compose(a, b)('c');
      const test = 'abc';

      assert.notEqual(actual, test);
    });

    it('should compose three functions', function() {
      const a = function(x: string) { return (x + 'a'); };
      const b = function(x: string) { return (x + 'b'); };
      const c = function(x: string) { return (x + 'c'); };

      const actual = compose(a, b, c)('d');
      const expected = 'dcba';

      assert.equal(actual, expected);
    });

    it('should compose four functions', function() {
      const a = function(x: string) { return (x + 'a'); };
      const b = function(x: string) { return (x + 'b'); };
      const c = function(x: string) { return (x + 'c'); };
      const d = function(x: string) { return (x + 'd'); };

      const actual = compose(a, b, c, d)('e');
      const expected = 'edcba';

      assert.equal(actual, expected);
    });

    it('should compose five functions', function() {
      const a = function(x: string) { return (x + 'a'); };
      const b = function(x: string) { return (x + 'b'); };
      const c = function(x: string) { return (x + 'c'); };
      const d = function(x: string) { return (x + 'd'); };
      const e = function(x: string) { return (x + 'e'); };

      const actual = compose(a, b, c, d, e)('f');
      const expected = 'fedcba';

      assert.equal(actual, expected);
    });
  });
});