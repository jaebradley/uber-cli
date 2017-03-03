'use es6';

import CurrencySymbol from 'currency-symbol-map';

import DistanceUnit from '../../../data/DistanceUnit';
import DistanceConverter from '../../DistanceConverter';
import DurationConverter from '../../DurationConverter';
import TimeUnit from '../../../data/TimeUnit';
import Utilities from '../../../Utilities';

export default class PriceEstimateFormatter {
  static formatRange(range) {
    const currencySymbol = CurrencySymbol(range.currencyCode);
    return `${currencySymbol}${range.low}-${currencySymbol}${range.high}`;
  }

  static formatDistance(distance) {
    // 2 decimal places
    const roundedDistanceValue = Math.round(distance.value * 100) / 100;
    return `${roundedDistanceValue} ${PriceEstimateFormatter.getDistanceUnitAbbreviation(distance.unit)}.`;
  }

  static formatDuration(duration) {
    // TODO @jbradley Utilities currently formats time in seconds - build better formatting logic
    const durationInSeconds = DurationConverter.convert(duration, TimeUnit.SECOND);
    return Utilities.generateFormattedTime(durationInSeconds.length);
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
