import { assert } from 'chai';
import { default as closest } from '../main/closest';

describe('closest', () => {
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

  it('should return closest element matching selector', () => {
    div1.classList.add('blue');
    const actual = closest('.blue', div2);
    const expected = div1;

    assert.equal(actual, expected);
  });

  it('should return null if no match', () => {
    div1.classList.add('blue');
    const actual = closest('#blue', div2);
    const expected: HTMLElement = null;

    assert.equal(actual, expected);
  });
});
