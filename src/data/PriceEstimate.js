'use es6';

import { Record } from 'immutable';
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
    return `${this.getFormattedPrice(this.range.low)}-${this.getFormattedPrice(this.range.high)}`
  }

  getFormattedDistance() {
    return `${this.distance} mi.`;
  }

  getFormattedPrice(price) {
    // Result of 1394 will be $1,349
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      maximumFractionDigits: 0,
      currency: this.currencyCode
    }).format(price);
  }
}
