import { assert } from 'chai';
import { postJSON } from '../main/';

describe('postJSON', () => {
  it('should return a task of a response', (done) => {
    const req = postJSON('test', {});

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
