'use es6';

import {Record} from 'immutable';

import Range from './Range';

let defaults = {
  productName: '',
  // in miles
  distance: 0,
  range: new Range(),
  // in seconds
  duration: 0,
  currencyCode: '',
  // wont show up unless > 1
  surgeMultiplier: 1
};

export default class PriceEstimate extends Record(defaults) {
}
