'use es6';

import CurrencySymbol from 'currency-symbol-map';

import DistanceConverter from '../../DistanceConverter';

export default class PriceEstimateFormatter {
  static getFormattedRange(range) {
    const currencySymbol = CurrencySymbol(range.currencyCode);
    return `${currencySymbol}${range.low}-${currencySymbol}${range.high}`;
  }

  static getFormattedDistance(distance) {
    // 2 decimal places
    const roundedDistanceValue = Math.round(distance.value * 100) / 100;
    return `${roundedDistanceValue} ${distance.unit.abbreviation.toLowerCase()}.`;
  }
}
