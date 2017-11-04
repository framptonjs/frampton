import { assert } from 'chai';
import { map } from '../main/map';
import { parser } from '../main/parser';

describe('map', () => {
  const format = '/user/:number/profile/edit';
  const pathParser = parser(format);

  it('returns Just with value mapped for matched path', () => {
    const mapped = map((parsed: number): string => {
      return `Mapped(${parsed})`;
    }, pathParser);
    const actual = mapped('/user/34/profile/edit').toString();
    const expected = 'Just(Mapped(34))';
    assert.equal(actual, expected);
  });
});
