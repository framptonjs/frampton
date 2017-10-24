import { assert } from 'chai';
import { default as matches } from '../main/matches';

describe('matches', () => {
  let div: HTMLElement = null;
  let container: HTMLElement = null;

  beforeEach(() => {
    div = document.createElement('div');
    container = document.body;
    container.appendChild(div);
  });

  afterEach(() => {
    container.removeChild(div);
    div = null;
    container = null;
  });

  it('should return true if element has class', () => {
    div.classList.add('blue');
    const actual: boolean = matches('.blue', div);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return true if an element has an id', () => {
    div.id = 'blue';
    const actual: boolean = matches('#blue', div);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return true if an element has an attribute', () => {
    div.setAttribute('aria-live', 'polite');
    const actual: boolean = matches('[aria-live]', div);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return false if an element does not match selector', () => {
    div.classList.add('blue');
    const actual: boolean = matches('.wrong', div);
    const expected: boolean = false;

    assert.equal(actual, expected);
  });
});
