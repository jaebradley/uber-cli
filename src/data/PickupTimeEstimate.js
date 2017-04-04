'use es6';

import { Record } from 'immutable';
import Duration from './Duration';

let defaults = {
  productName: '',
  estimatedDuration: new Duration(),
};

export default class PickupTimeEstimate extends Record(defaults){
};
