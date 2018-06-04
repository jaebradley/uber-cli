import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';
import TimeUnit from './TimeUnit';

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
  duration: {
    length: 0,
    unit: TimeUnit.SECOND,
  },
  // wont show up unless > 1
  surgeMultiplier: 1,
};

export default class TripPriceEstimate extends Record(defaults) {}
