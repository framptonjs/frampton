import { parseSearch, QueryMap } from '../../main/utils';
import { assert } from 'chai';


describe('Utils', function() {
  describe('parseSearch', function() {
    it('should correctly parse query string', function() {
      const query: string = '?key1=test1&key2=test2&key3=test3';
      const actual: QueryMap = parseSearch(query);
      const expected: QueryMap = {
        key1: 'test1',
        key2: 'test2',
        key3: 'test3'
      };

      assert.deepEqual(actual, expected);
    });

    it('should return empty object for empty string', function() {
      const query: string = '';
      const actual: QueryMap = parseSearch(query);
      const expected: QueryMap = {};

      assert.deepEqual(actual, expected);
    });

    it('should ignore malformed pairs', function() {
      const query = '?key1-test1&key2=test2&key3=test3';
      const actual: QueryMap = parseSearch(query);
      const expected: QueryMap = {
        key2: 'test2',
        key3: 'test3'
      };

      assert.deepEqual(actual, expected);
    });

    it('should ignore empty values', function() {
      const query = '?key1=&key2=test2&key3=test3';
      const actual: QueryMap = parseSearch(query);
      const expected: QueryMap = {
        key2: 'test2',
        key3: 'test3'
      };

      assert.deepEqual(actual, expected);
    });
  });
});