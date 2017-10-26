import { assert } from 'chai';
import { upload } from '../main/';

describe('upload', () => {
  it('should return a task of a response', (done) => {
    const req = upload('test', new File(['test content'], 'test.txt', {
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
          done();
        }
      },
    });
  });
});
