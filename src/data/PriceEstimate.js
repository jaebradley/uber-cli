'use es6';

import {Record} from 'immutable';
import CurrencySymbol from 'currency-symbol-map';

import Distance from './Distance';
import Range from './Range';

let defaults = {
  productName: '',
  // in miles
  distance: new Distance(),
  range: new Range(),
  // in seconds
  duration: 0,
  currencyCode: '',
  // wont show up unless > 1
  surgeMultiplier: 1
};

export default class PriceEstimate extends Record(defaults) {
  getFormattedRange() {
    return `${CurrencySymbol(this.currencyCode)}${this.range.low}-${CurrencySymbol(this.currencyCode)}${this.range.high}`;
  }
}
