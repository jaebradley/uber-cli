'use es6';

import {Record} from 'immutable';
import CurrencySymbol from 'currency-symbol-map';
import convert from 'convert-units';

import Unit from 'Unit';

import Range from './Range';

let defaults = {
  productName: '',
  // Uber returns miles
  // https://developer.uber.com/docs/riders/references/api/v1.2/estimates-price-get
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

  getFormattedDistance(unit) {
    return `${this.getConvertedDistance()} ${unit.abbreviation.toLowerCase()}`;
  }

  getConvertedDistance(unit) {
    case (unit) {
      switch Unit.KILOMETER: {
        return convert(this.distance).from('mi').to('m') * 1000;
      }

      switch Unit.MILE: {
        return this.distance;
      }

      default: {
        throw new TypeError('Unexpected Unit');
      }
    }
  }
}
