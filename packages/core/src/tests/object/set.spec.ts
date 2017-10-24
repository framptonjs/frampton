import { set } from '../../main/object';
import { assert } from 'chai';


describe('Object', function() {
  describe('set', function() {
    it('should set new value for key', function() {
      const obj = { one: 1, two: 2, three: 3 };
      const actual = set('one', 2, obj);
      const expected = { one: 2, two: 2, three: 3 };

      assert.deepEqual(actual, expected);
    });

    it('should return a new instance', function() {
      const obj = { one: 1, two: 2, three: 3 };
      const newObj = set('one', 2, obj);

      assert.ok(obj !== newObj);
    });

    it('should set new value for nested key', function() {
      const obj = { one: 1, two: { foo: 4 }, three: 3 };
      const actual = set('two.foo', 2, obj);
      const expected = { one: 1, two: { foo: 2 }, three: 3 };

      assert.deepEqual(actual, expected);
    });

    it('should add new value for missing key', function() {
      const obj = {};
      const actual = set('two', 2, obj);
      const expected = { two: 2 };

      assert.deepEqual(actual, expected);
    });

    it('should add new value for missing nested key', function() {
      const obj = { one: { two: {} } };
      const actual = set('one.three', 3, obj);
      const expected = { one: { two: {}, three: 3 } };

      assert.deepEqual(actual, expected);
    });
  });
});
