import { assert } from 'chai';
import { read } from '../main/read';

describe('read', () => {
  it('should return a task of a response', (done) => {
    const req = read('DATA_URL', new File(['test content'], 'test.txt', {
      type: 'text/plain',
    }));

    req.run({
      reject(err: any) {
        assert.ok(false, 'returned error');
        done();
      },
      resolve(val: any) {
        if (val.status === 'success') {
          assert.ok(true);
        } else {
          assert.ok(false);
        }
        done();
      },
    });
  });
});
