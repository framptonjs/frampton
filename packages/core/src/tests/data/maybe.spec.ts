import { Maybe } from '../../main/data';
import { assert } from 'chai';


describe('Maybe', function() {
  describe('fromNullable', function() {
    it('should return a Just for non-null value', function() {
      const maybe = Maybe.fromNullable(5);
      const actual = maybe.toString();
      const expected = 'Just(5)';

      assert.equal(actual, expected);
    });
  });

  describe('toString', function() {
    it('should return accurate representation of a Just', function() {
      const maybe = Maybe.just(5);
      const actual = maybe.toString();
      const expected = 'Just(5)';

      assert.equal(actual, expected);
    });

    it('should return accurate representation of a Nothing', function() {
      const maybe = Maybe.nothing();
      const actual = maybe.toString();
      const expected = 'Nothing';

      assert.equal(actual, expected);
    });

    it('should return accurate representation of nested Maybes', function() {
      const maybe = Maybe.just(Maybe.just(3));
      const actual = maybe.toString();
      const expected = 'Just(Just(3))';

      assert.equal(actual, expected);
    });
  });

  describe('map', function() {
    it('should correctly transform value of a Just', function() {
      const maybe = Maybe.just(5);
      const actual = maybe.map((val) => val + 3).toString();
      const expected = 'Just(8)';

      assert.equal(actual, expected);
    });
  });

  describe('filter', function() {
    it('should return Nothing if Maybe fails predicate', function() {
      const maybe = Maybe.just(5);
      const actual = maybe.filter((val) => val < 3).toString();
      const expected = 'Nothing';

      assert.equal(actual, expected);
    });

    it('should return Just if Maybe passes predicate', function() {
      const maybe = Maybe.just(5);
      const actual = maybe.filter((val) => val > 3).toString();
      const expected = 'Just(5)';

      assert.equal(actual, expected);
    });
  });

  describe('getOrElse', function() {
    it('should return value contained in a Just', function() {
      const maybe = Maybe.just(5);
      const actual = maybe.getOrElse(8);
      const expected = 5;

      assert.equal(actual, expected);
    });

    it('should return provided default value for a Nothing', function() {
      const maybe = Maybe.nothing();
      const actual = maybe.getOrElse(8);
      const expected = 8;

      assert.equal(actual, expected);
    });
  });
});
