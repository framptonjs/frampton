import { assert } from 'chai';
import { default as applyStyles } from '../main/apply-styles';
import { default as currentValue } from '../main/current-value';

describe('currentValue', () => {
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

  it('should set the styles on an element', () => {
    applyStyles({
      color: 'rgb(0,0,255)',
      height: '100px',
    }, div);

    assert.equal(currentValue('color', div), 'rgb(0, 0, 255)');
    assert.equal(currentValue('height', div), '100px');
  });
});
