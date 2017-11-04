import { assert } from 'chai';
import { int } from '../main/int';

describe('int', () => {
  it('returns a Just for an integer', () => {
    const actual = int('3').toString();
    const expected = 'Just(3)';
    assert.equal(actual, expected);
  });

  it('returns a Nothing for a string', () => {
    const actual = int('hello').toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });

  it('returns a Nothing for a complex path', () => {
    const actual = int('/45/65').toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });
});
