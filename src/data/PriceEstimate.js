'use es6';

import {Record} from 'immutable';
import CurrencySymbol from 'currency-symbol-map';

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
  getFormattedRange() {
    return `${CurrencySymbol(this.currencyCode)}${this.range.low}-${CurrencySymbol(this.currencyCode)}${this.range.high}`;
  }

  getFormattedDistance() {
    return `${this.distance} mi.`;
  }
}
