import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';
import Duration from './Duration';
import PriceRange from './PriceRange';

const defaults = {
  productName: '',
  distance: {
    value: 0,
    unit: DistanceUnit.MILE,
  },
  range: new PriceRange(),
  duration: new Duration(),
  // wont show up unless > 1
  surgeMultiplier: 1,
};

export default class PriceEstimate extends Record(defaults) {}
