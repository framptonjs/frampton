import { assert } from 'chai';
import { str } from '../main/str';

describe('str', () => {
  it('returns a Nothing for an integer', () => {
    const actual = str('3').toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });

  it('returns a Just for a string', () => {
    const actual = str('hello').toString();
    const expected = 'Just(hello)';
    assert.equal(actual, expected);
  });

  it('returns a Nothing for a complex path', () => {
    const actual = str('/what/this').toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });
});
