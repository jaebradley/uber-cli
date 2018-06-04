import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';
import Duration from './Duration';

const defaults = {
  productName: '',
  distance: {
    value: 0,
    unit: DistanceUnit.MILE,
  },
  range: {
    low: 0,
    high: 0,
    currencyCode: 'USD',
  },
  duration: new Duration(),
  // wont show up unless > 1
  surgeMultiplier: 1,
};

export default class PriceEstimate extends Record(defaults) {}
