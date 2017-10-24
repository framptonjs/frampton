import { diffClasses } from '../../main/utils/diff-classes';
import { AttrType } from '../../main/attributes';
import { ClassMap, ClassAttribute } from '../../main/attributes/classes';
import { assert } from 'chai';


describe('utils/diff-classes', () => {
  it('should return undefined for identical class descriptions', () => {
    const class1: ClassAttribute = {
      type: AttrType.CLASS_LIST,
      value: {
        'test-one': true,
        'test-two': false,
        'test-three': true
      }
    };
    const class2: ClassAttribute = {
      type: AttrType.CLASS_LIST,
      value: {
        'test-one': true,
        'test-two': false,
        'test-three': true
      }
    };
    const actual = diffClasses(class1, class2);
    const expected: ClassAttribute = undefined;

    assert.deepEqual(actual, expected);
  });

  it('should correctly diff class descriptions', () => {
    const class1: ClassAttribute = {
      type: AttrType.CLASS_LIST,
      value: {
        'test-one': true,
        'test-two': false,
        'test-three': true
      }
    };
    const class2: ClassAttribute = {
      type: AttrType.CLASS_LIST,
      value: {
        'test-one': false,
        'test-two': true,
        'test-three': true,
        'test-four': true
      }
    };
    const actual = diffClasses(class1, class2);
    const expected: ClassAttribute = {
      type: AttrType.CLASS_LIST,
      value: {
        'test-one': false,
        'test-two': true,
        'test-four': true
      }
    };

    assert.deepEqual(actual, expected);
  });
});