'use es6';

import { Record } from 'immutable';
import Duration from './Duration';

let TripDurationEstimate = {
  productName: '',
  estimatedDuration: new Duration(),
};

export default class TripDurationEstimate extends Record(defaults){
};
