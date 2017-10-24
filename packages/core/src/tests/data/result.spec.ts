import { Result } from '../../main/data';
import { assert } from 'chai';


describe('Result', function() {
  describe('fromThrowable', function() {
    it('should return a function that returns a Result', function() {
      const resultFn = Result.fromThrowable(function(a: number): number {
        return a + 5;
      });
      const actual = resultFn(3).toString();
      const expected = 'Success(8)';

      assert.equal(actual, expected);
    });

    it('should return a function that returns a Failure on error', function() {
      const resultFn = Result.fromThrowable(function(a: number): number {
        throw Error('Stuff be broken');
      });
      const actual = resultFn(3).toString();
      const expected = 'Failure(Stuff be broken)';

      assert.equal(actual, expected);
    });
  });

  describe('toString', function() {
    it('should return accurate representation of a Success', function() {
      const result = Result.success(3);
      const actual = result.toString();
      const expected = 'Success(3)';

      assert.equal(actual, expected);
    });

    it('should return accurate representation of a Failure', function() {
      const result = Result.failure('Error');
      const actual = result.toString();
      const expected = 'Failure(Error)';

      assert.equal(actual, expected);
    });
  });

  describe('map', function() {
    it('should transform the value of a Success', function() {
      const result = Result.success(3).map((val) => val + 4);
      const actual = result.toString();
      const expected = 'Success(7)';

      assert.equal(actual, expected);
    });

    it('should ignore the value in a Failure', function() {
      const result = Result.failure('Error').map((val) => val + 4);
      const actual = result.toString();
      const expected = 'Failure(Error)';

      assert.equal(actual, expected);
    });
  });

  describe('mapFailure', function() {
    it('should transform the value of a Failure', function() {
      const result = Result.failure(3).mapFailure((val) => val + 4);
      const actual = result.toString();
      const expected = 'Failure(7)';

      assert.equal(actual, expected);
    });

    it('should ignore the value in a Success', function() {
      const result = Result.success(5).mapFailure((val) => val + 4);
      const actual = result.toString();
      const expected = 'Success(5)';

      assert.equal(actual, expected);
    });
  });

  describe('filter', function() {
    it('should return Failure for Successes that fail predicate', function() {
      const result = Result.success(3).filter((val) => val > 4);
      const actual = result.toString();
      const expected = 'Failure(3)';

      assert.equal(actual, expected);
    });

    it('should return Success for Successes that pass predicate', function() {
      const result = Result.success(3).filter((val) => val < 4);
      const actual = result.toString();
      const expected = 'Success(3)';

      assert.equal(actual, expected);
    });
  });

  describe('fork', function() {
    it('should return value of first function for Success', function() {
      const result = Result.success(3);
      const actual = result.fork((val) => 'Success', (err) => 'Error');
      const expected = 'Success';

      assert.equal(actual, expected);
    });

    it('should return value of second function for Failure', function() {
      const result = Result.failure(3);
      const actual = result.fork((val) => 'Success', (err) => 'Error');
      const expected = 'Error';

      assert.equal(actual, expected);
    });
  });

  describe('isFailure', function() {
    it('should return false for Success', function() {
      const result = Result.success(3);
      const actual = result.isFailure();
      const expected = false;

      assert.equal(actual, expected);
    });

    it('should return true Failure', function() {
      const result = Result.failure(3);
      const actual = result.isFailure();
      const expected = true;

      assert.equal(actual, expected);
    });
  });

  describe('isSuccess', function() {
    it('should return true for Success', function() {
      const result = Result.success(3);
      const actual = result.isSuccess();
      const expected = true;

      assert.equal(actual, expected);
    });

    it('should return false Failure', function() {
      const result = Result.failure(3);
      const actual = result.isSuccess();
      const expected = false;

      assert.equal(actual, expected);
    });
  });
});
