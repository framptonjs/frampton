import { assert } from 'chai';
import { parser } from '../main/parser';

describe('parser', () => {
  it('returns a function', () => {
    const format = '/user/:number/profile/edit';
    const actual = parser(format);
    assert.ok(typeof actual === 'function');
  });

  it('parser return Just for matched path', () => {
    const format = '/user/:number/profile/edit';
    const path = '/user/34/profile/edit';
    const pathParser = parser(format);
    const actual = pathParser(path).toString();
    const expected = 'Just(34)';
    assert.equal(actual, expected);
  });

  it('parser returns Nothing for incorrect types', () => {
    const format = '/user/:number/profile/edit';
    const path = '/user/john/profile/edit';
    const pathParser = parser(format);
    const actual = pathParser(path).toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });

  it('parser returns Nothing if path is too short', () => {
    const format = '/user/:number/profile/edit';
    const path = '/user/34/profile';
    const pathParser = parser(format);
    const actual = pathParser(path).toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });

  it('parser returns Nothing if path is too long', () => {
    const format = '/user/:number/profile';
    const path = '/user/34/profile/edit';
    const pathParser = parser(format);
    const actual = pathParser(path).toString();
    const expected = 'Nothing';
    assert.equal(actual, expected);
  });

  it('parser returns Just for index on end of matched path', () => {
    const format = '/user/:number/profile/';
    const path = '/user/34/profile/index.html';
    const pathParser = parser(format);
    const actual = pathParser(path).toString();
    const expected = 'Just(34)';
    assert.equal(actual, expected);
  });
});
