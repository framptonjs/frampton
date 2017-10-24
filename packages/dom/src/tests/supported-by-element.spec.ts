import { assert } from 'chai';
import { default as supportedByElement } from '../main/supported-by-element';

describe('supportedByElement', () => {
  let element: any = null;

  beforeEach(() => {
    element = {
      style : {
        borderRadius: '0',
        MozAnimationDuration: '0',
        webkitBoxShadow: '0',
      },
    };
  });

  afterEach(() => {
    element = null;
  });

  it('should return unprefixed property if browser supports it', () => {
    const actual = supportedByElement(element, 'border-radius');
    const expected = 'border-radius';

    assert.equal(actual, expected);
  });

  it('should return prefixed property for moz only property', () => {
    const actual = supportedByElement(element, 'animation-duration');
    const expected = '-moz-animation-duration';

    assert.equal(actual, expected);
  });

  it('should return prefixed property for webkit only property', () => {
    const actual = supportedByElement(element, 'box-shadow');
    const expected = '-webkit-box-shadow';

    assert.equal(actual, expected);
  });
});
