import { location } from '../../main/signals';
import { getLocation } from '../../main/utils';
import { assert } from 'chai';


describe('Signals', function() {
  describe('location', function() {
    it('should return Signal with initial value of 0', function() {
      const actual: Location = location.get();
      const expected: Location = getLocation();

      assert.equal(actual.host, expected.host);
      assert.equal(actual.hostname, expected.hostname);
      assert.equal(actual.hash, expected.hash);
      assert.equal(actual.href, expected.href);
      assert.equal(actual.origin, expected.origin);
      assert.equal(actual.port, expected.port);
      assert.equal(actual.protocol, expected.protocol);
      assert.equal(actual.pathname, expected.pathname);
      assert.equal(actual.search, expected.search);
    });
  });
});