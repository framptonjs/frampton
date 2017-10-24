import { assert } from 'chai';
import { default as elementValue } from '../main/element-value';

describe('elementValue', () => {
  it('should return true if element has class', () => {
    const input: HTMLInputElement = document.createElement('input');
    input.value = 'test';

    const actual: string = elementValue(input);
    const expected: string = 'test';

    assert.equal(actual, expected);
  });
});
