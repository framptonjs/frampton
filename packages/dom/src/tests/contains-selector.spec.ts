import { assert } from 'chai';
import { default as containsSelector } from '../main/contains-selector';

describe('contains', () => {
  let div1: HTMLElement = null;
  let div2: HTMLElement = null;
  let container: HTMLElement = null;

  beforeEach(() => {
    div1 = document.createElement('div');
    div2 = document.createElement('div');
    container = document.body;
    container.appendChild(div1);
    div1.appendChild(div2);
  });

  afterEach(() => {
    container.removeChild(div1);
    div1 = null;
    div2 = null;
    container = null;
  });

  it('should return true if element contains element with selector', () => {
    div1.classList.add('blue');
    const actual = containsSelector('.blue', div1);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return null if no match', () => {
    div1.classList.add('blue');
    const actual = containsSelector('#blue', div1);
    const expected: boolean = false;

    assert.equal(actual, expected);
  });
});
