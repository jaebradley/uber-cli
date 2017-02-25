'use es6';

import { Record } from 'immutable';

import Distance from './Distance';
import Range from './Range';

let defaults = {
  productName: '',
  distance: new Distance(),
  range: new Range(),
  // in seconds
  duration: 0,
  currencyCode: '',
  // wont show up unless > 1
  surgeMultiplier: 1
};

export default class PriceEstimate extends Record(defaults) {
}
