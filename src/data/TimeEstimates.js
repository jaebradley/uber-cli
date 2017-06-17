import { List, Record } from 'immutable';

import Location from './Location';

const defaults = {
  location: new Location(),
  estimates: List(),
};

export default class TimeEstimates extends Record(defaults) {}
