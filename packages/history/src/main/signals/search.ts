import { Signal } from '@frampton/core';
import { getLocation, parseSearch, QueryMap } from '../utils';
import location from './location';


const searchSignal: Signal<QueryMap> =
  location.map((loc: Location) => {
    return parseSearch(loc.search || '');
  });


/**
 * A Signal representing the current location.search
 *
 * @name search
 * @property
 * @memberof Frampton.History
 * @type {Frampton.Signal.Signal}
 */
export default searchSignal;
