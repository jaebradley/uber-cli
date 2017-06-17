import { List, Record } from 'immutable';

import Location from './Location';

const defaults = {
  start: new Location(),
  end: new Location(),
  estimates: List(),
};

export default class PriceEstimates extends Record(defaults) {}
