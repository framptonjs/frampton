import { assert } from 'chai';
import { joinPath } from '../../main/utils';

describe('Utils.joinPath', () => {
  it('should return a function', () => {
    const actual = joinPath([ 'this', 'is', 'a', 'test' ]);
    const expected = 'this/is/a/test';

    assert.equal(actual, expected);
  });
});
