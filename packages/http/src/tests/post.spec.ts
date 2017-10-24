import post from '../main/post';
import { assert } from 'chai';

describe('post', function() {
  it('should return a task of a response', function(done) {
    const req = post('test', {});

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
      }
    });
  });
});
