import { assert } from 'chai';
import { postString } from '../main/';

describe('postString', () => {
  it('should return a task of a response', (done) => {
    const req = postString('test', {});

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
