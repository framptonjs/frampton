import { assert } from 'chai';
import { default as selectorContains } from '../main/selector-contains-element';

describe('selectorContainsElement', () => {
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

  it('should return true if the element is contained inside an element with the given selector', () => {
    div1.classList.add('blue');
    const actual: boolean = selectorContains('.blue', div2);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return true if the element matches the selector', () => {
    div1.classList.add('blue');
    const actual: boolean = selectorContains('.blue', div1);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return false if the element is not contained inside an element with the given selector', () => {
    div2.classList.add('blue');
    const actual: boolean = selectorContains('.blue', div1);
    const expected: boolean = false;

    assert.equal(actual, expected);
  });
});
