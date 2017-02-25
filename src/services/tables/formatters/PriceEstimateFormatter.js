'use es6';

import CurrencySymbol from 'currency-symbol-map';

import Unit from 'Unit';

export default class PriceEstimateFormatter {
  static getFormattedRange(estimate) {
    return `${CurrencySymbol(estimate.currencyCode)}${estimate.range.low}-${CurrencySymbol(estimate.currencyCode)}${estimate.range.high}`;
  }

  static getFormattedDistance(estimate) {
    return `${PriceEstimateFormatter.getConvertedDistance(estimate.unit)} ${estimate.unit.abbreviation.toLowerCase()}`;
  }

  static getConvertedDistance(unit) {
    switch (unit) {
      case Unit.KILOMETER: {
        return convert(this.distance).from('mi').to('m') * 1000;
      }

      case Unit.MILE: {
        return this.distance;
      }

      default: {
        throw new TypeError('Unexpected Unit');
      }
    }
  }
}
