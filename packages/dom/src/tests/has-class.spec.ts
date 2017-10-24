import { assert } from 'chai';
import { default as hasClass } from '../main/has-class';

describe('hasClass', () => {
  it('should return true if element has class', () => {
    const div: HTMLElement = document.createElement('div');
    div.classList.add('test');
    const actual: boolean = hasClass('test', div);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return false if element does not have class', () => {
    const div: HTMLElement = document.createElement('div');
    div.classList.add('test');
    const actual: boolean = hasClass('wrong', div);
    const expected: boolean = false;

    assert.equal(actual, expected);
  });
});
