import { flipArgs } from '../../main/utils';
import { assert } from 'chai';


describe("Utils", function() {
  describe('flipArgs', function() {
    it('should take a binary function and return a copy with args flipped', function() {
      const fn: (a: string, b: string) => string =
        (a, b) => a + b;

      const reversed = flipArgs(fn);

      const actual = reversed('one', 'two');
      const expected = 'twoone';

      assert.equal(actual, expected);
    });
  });
});