'use es6';

import CurrencySymbol from 'currency-symbol-map';

import DistanceUnit from '../../../data/DistanceUnit';
import DistanceConverter from '../../DistanceConverter';

export default class PriceEstimateFormatter {
  static getFormattedRange(range) {
    const currencySymbol = CurrencySymbol(range.currencyCode);
    return `${currencySymbol}${range.low}-${currencySymbol}${range.high}`;
  }

  static formatDistance(distance) {
    // 2 decimal places
    const roundedDistanceValue = Math.round(distance.value * 100) / 100;
    return `${roundedDistanceValue} ${PriceEstimateFormatter.getDistanceUnitAbbreviation(distance.unit)}.`;
  }

  static getDistanceUnitAbbreviation(unit) {
    switch (unit) {
      case DistanceUnit.MILE: {
        return 'mi';
      }

      case DistanceUnit.KILOMETER: {
        return 'km';
      }

      default: {
        throw new TypeError('Unexpected distance unit');
      }
    }
  }
}
