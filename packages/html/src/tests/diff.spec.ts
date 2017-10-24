import { assert } from 'chai';
import { diff } from '../main/diff';
import * as Elements from '../main/elements';
import * as Html from '../main/html';
import * as Keyed from '../main/keyed';
import { Patch, PatchType } from '../main/patches';

describe('diff', () => {
  it('should return empty patch set for identical nodes', () => {
    const div1 = Html.div([], []);
    const div2 = Html.div([], []);
    const actual = diff(div1, div2);
    const expected: Array<Patch> = [];

    assert.deepEqual(actual, expected);
  });

  it('should correctly diff reordered keyed nodes', () => {
    const div1 = Keyed.ul([], [ Keyed.li(1, [], []), Keyed.li(2, [], []) ]);
    const div2 = Keyed.ul([], [ Keyed.li(2, [], []), Keyed.li(1, [], []) ]);
    const actual = diff(div1, div2);
    const expected: Array<Patch> = [ {
      type: PatchType.REORDER,
      data: {
        inserts: [],
        deletes: [],
        moves: [ {
          node: Elements.vKeyedChild(2, Html.li([], [])),
          oldIndex: 1,
          newIndex: 0,
        },
        {
          node: Elements.vKeyedChild(1, Html.li([], [])),
          oldIndex: 0,
          newIndex: 1,
        } ],
      },
      domNode: null,
    } ];

    assert.deepEqual(actual, expected);
  });

  it('should correctly diff deleted keyed nodes', () => {
    const div1 = Keyed.ul([], [ Keyed.li(1, [], []), Keyed.li(2, [], []) ]);
    const div2 = Keyed.ul([], [ Keyed.li(2, [], []) ]);
    const actual = diff(div1, div2);
    const expected: Array<Patch> = [ {
      type: PatchType.REORDER,
      data: {
        inserts: [],
        deletes: [ {
          node: Elements.vKeyedChild(1, Html.li([], [])),
        } ],
        moves: [ {
          node: Elements.vKeyedChild(2, Html.li([], [])),
          oldIndex: 1,
          newIndex: 0,
        } ],
      },
      domNode: null,
    } ];

    assert.deepEqual(actual, expected);
  });

  it('should correctly diff inserted keyed nodes', () => {
    const div1 = Keyed.ul([], [
      Keyed.li(1, [], []),
      Keyed.li(2, [], []),
    ]);
    const div2 = Keyed.ul([], [
      Keyed.li(1, [], []),
      Keyed.li(2, [], []),
      Keyed.li(3, [], []),
    ]);
    const actual = diff(div1, div2);
    const expected: Array<Patch> = [ {
      type: PatchType.REORDER,
      data: {
        inserts: [ {
          index: 2,
          node: Elements.vKeyedChild(3, Html.li([], [])),
        } ],
        deletes: [],
        moves: [],
      },
      domNode: null,
    } ];

    assert.deepEqual(actual, expected);
  });

  it('should correctly diff inserted keyed nodes that cause reorder', () => {
    const div1 = Keyed.ul([], [
      Keyed.li(1, [], []),
      Keyed.li(2, [], []),
    ]);
    const div2 = Keyed.ul([], [
      Keyed.li(1, [], []),
      Keyed.li(3, [], []),
      Keyed.li(2, [], []),
    ]);
    const actual = diff(div1, div2);
    const expected: Array<Patch> = [ {
      type: PatchType.REORDER,
      data: {
        inserts: [ {
          index: 1,
          node: Elements.vKeyedChild(3, Html.li([], [])),
        } ],
        deletes: [],
        moves: [ {
          node: Elements.vKeyedChild(2, Html.li([], [])),
          oldIndex: 1,
          newIndex: 2,
        } ],
      },
      domNode: null,
    } ];

    assert.deepEqual(actual, expected);
  });
});
