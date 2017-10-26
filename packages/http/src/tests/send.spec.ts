import { assert } from 'chai';
import { defaultSettings, send } from '../main/';
import { makeRequest } from '../main/request';

describe('send', () => {
  it('should return a task of a response', (done) => {
    const req = send(defaultSettings, makeRequest('send_test'));

    req.run({
      reject(err: any) {
        assert.ok(false, 'returned error');
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
