'use es6';

import CurrencySymbol from 'currency-symbol-map';

import DistanceConverter from '../services/DistanceConverter';

export default class PriceEstimateFormatter {
  static getFormattedRange(estimate) {
    const currencySymbol = CurrencySymbol(estimate.currencyCode);
    return `${currencySymbol}${estimate.range.low}-${currencySymbol}${estimate.range.high}`;
  }

  static getFormattedDistance(estimate, unit) {
    const convertedDistance = DistanceConverter.convert(this.distance, unit);
    // 2 decimal places
    const roundedDistanceValue = Math.round(convertedDistance.value * 100) / 100;
    return `${roundedDistanceValue} ${unit.abbreviation.toLowerCase()}.`;
  }
}
