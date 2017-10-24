import { assert } from 'chai';
import { default as contains } from '../main/contains';

describe('contains', () => {
  let parent: HTMLElement = null;
  let child: HTMLElement = null;
  let orphan: HTMLElement = null;
  let container: HTMLElement = null;

  beforeEach(() => {
    parent = document.createElement('div');
    child = document.createElement('div');
    orphan = document.createElement('div');
    container = document.body;
    container.appendChild(parent);
    container.appendChild(orphan);
    parent.appendChild(child);
  });

  afterEach(() => {
    container.removeChild(parent);
    container.removeChild(orphan);
    parent = null;
    child = null;
    orphan = null;
    container = null;
  });

  it('should return true if element contains element with selector', () => {
    const actual = contains(parent, child);
    const expected: boolean = true;

    assert.equal(actual, expected);
  });

  it('should return null if no match', () => {
    const actual = contains(parent, orphan);
    const expected: boolean = false;

    assert.equal(actual, expected);
  });
});
