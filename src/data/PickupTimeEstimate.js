import { Record } from 'immutable';

import Duration from './Duration';

const defaults = {
  productName: '',
  estimatedDuration: new Duration(),
};

export default class PickupTimeEstimate extends Record(defaults) {}
