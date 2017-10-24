import { get } from '../../main/object';
import { assert } from 'chai';


describe('Object', function() {
  describe('get', function() {
    it('should retrieve value of key in object', function() {
      const temp: any = { id : 1 };
      const actual: number = get('id', temp);
      const expected: number = 1;

      assert.equal(actual, expected);
    });

    it('should return null for invalid key', function() {
      const temp: any = { id : 1 };
      const actual: number = get('nope', temp);
      const expected: number = null;

      assert.equal(actual, expected);
    });

    it('should return correct value of nested key', function() {
      const temp: any = { data : { obj : { id : 1 } } };
      const actual: number = get('data.obj.id', temp);
      const expected: number = 1;

      assert.equal(actual, expected);
    });

    it('should return null for missing nested key', function() {
      const temp: any = { data : { obj : { id : 1 } } };
      const actual: number = get('data.obj.wrong', temp);
      const expected: number = null;

      assert.equal(actual, expected);
    });

    it('should return null for missing nested root key', function() {
      const temp: any = { data : { obj : { id : 1 } } };
      const actual: number = get('wrong.obj.id', temp);
      const expected: number = null;

      assert.equal(actual, expected);
    });

    it('should return value at index', function() {
      const temp: Array<number> = [1, 2, 3, 4, 5];
      const actual: number = get('3', temp);
      const expected: number = 4;

      assert.equal(actual, expected);
    });

    it('should return null for missing index', function() {
      const temp: Array<number> = [1, 2, 3, 4, 5];
      const actual: number = get('8', temp);
      const expected: number = null;

      assert.equal(actual, expected);
    });
  });
});