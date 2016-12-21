'use es6';

import {Record} from 'immutable';

import Range from './Range';

let defaults = {
  productName: '',
  distance: 0,
  range: new Range(),
  durationSeconds: 0,
  currencyCode: ''
};

export default class PriceEstimate extends Record(defaults) {
}
