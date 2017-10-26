import { assert } from 'chai';
import { getRequest } from '../main/';

describe('getRequest', () => {
  it('should return a task of a response', (done) => {
    const req = getRequest('test');

    req.run({
      reject(err: any) {
        assert.ok(false, 'returned error');
        done();
      },
      resolve(val: any) {
        if (val.status === 'success') {
          assert.ok(true);
          done();
        }
      },
    });
  });
});
