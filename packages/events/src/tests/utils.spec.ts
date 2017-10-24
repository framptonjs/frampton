import { assert } from 'chai';
import { lazy } from '../main/utils';

describe('Utils', () => {
  describe('lazy', () => {
    it('should return a function', () => {
      const add = (a: number, b: number): number => a + b;
      const actual = (typeof lazy(add, [1, 2]));
      const expected = 'function';

      assert.equal(actual, expected);
    });

    it('should return a function that lazily applies given function', () => {
      const add = (a: number, b: number): number => a + b;
      const lazyAdd = lazy(add, [1, 2]);
      const actual = lazyAdd();
      const expected = 3;

      assert.equal(actual, expected);
    });
  });
});
