import { Record } from 'immutable';

import TimeUnit from './TimeUnit';

const defaults = {
  productName: '',
  estimatedDuration: {
    length: 0,
    unit: TimeUnit.SECOND,
  },
};

export default class PickupTimeEstimate extends Record(defaults) {}
