import { assert } from 'chai';
import { default as addClass } from '../main/add-class';

describe('addClass', () => {
  it('should return true if element has class', () => {
    const div = document.createElement('div');
    addClass('test', div);
    const actual = div.classList.contains('test');
    const expected = true;

    assert.equal(actual, expected);
  });

  it('should return false if element does not have class', () => {
    const div = document.createElement('div');
    addClass('test', div);
    const actual = div.classList.contains('wrong');
    const expected = false;

    assert.equal(actual, expected);
  });
});
