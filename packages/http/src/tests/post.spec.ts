import { assert } from 'chai';
import { postRequest } from '../main/';

describe('postRequest', () => {
  it('should return a task of a response', (done) => {
    const req = postRequest('test', {});

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
