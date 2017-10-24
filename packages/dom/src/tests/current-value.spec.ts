import { assert } from 'chai';
import { default as currentValue } from '../main/current-value';

describe('currentValue', () => {
  let div: HTMLElement = null;
  let container: HTMLElement = null;

  beforeEach(() => {
    div = document.createElement('div');
    div.style.color = 'rgb(0, 0, 255)';
    container = document.body;
    container.appendChild(div);
  });

  afterEach(() => {
    container.removeChild(div);
    div = null;
    container = null;
  });

  it('should retrieve the value of a style on element', () => {
    const actual: string = currentValue('color', div);
    const expected: string = 'rgb(0, 0, 255)';

    assert.equal(actual, expected);
  });
});
