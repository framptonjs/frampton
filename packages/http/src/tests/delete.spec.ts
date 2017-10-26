import { assert } from 'chai';
import { deleteRequest} from '../main/';

describe('deleteRequest', () => {
  it('should return a task of a response', (done) => {
    const req = deleteRequest('test');

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
