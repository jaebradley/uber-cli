'use es6';

import { List } from 'immutable';
import CurrencySymbol from 'currency-symbol-map';

import DistanceUnit from '../../data/DistanceUnit';
import DistanceConverter from '../DistanceConverter';
import DurationConverter from '../DurationConverter';
import TimeUnit from '../../data/TimeUnit';
import Utilities from '../../Utilities';

export default class TripPriceEstimateRowFormatter {
  constructor(distanceConverter, durationConverter) {
    this.distanceUnitAbbreviations = {
      DistanceUnit.MILE: 'mi',
      DistanceUnit.KILOMETER: 'km'
    };
    this.distanceConverter = distanceConverter;
    this.DurationConverter = durationConverter;
  }

  format(estimate, rowDistanceUnit) {
    return List.of(
      this.formatRange(estimate.range),
      this.formatDistance(estimate.distance, rowDistanceUnit),
      this.formatDuration(estimate.duration)
    );
  }

  formatRange(range) {
    const currencySymbol = CurrencySymbol(range.currencyCode);
    return `${currencySymbol}${range.low}-${currencySymbol}${range.high}`;
  }

  formatDistance(distance, rowDistanceUnit) {
    // 2 decimal places
    const convertedDistance = this.distanceConverter.convert(distance, rowDistanceUnit);
    const roundedDistanceValue = Math.round(convertedDistance.value * 100) / 100;
    return `${roundedDistanceValue} ${this.getDistanceUnitAbbreviation(convertedDistance.unit)}.`;
  }

  formatDuration(duration) {
    // TODO @jbradley Utilities currently formats time in seconds - build better formatting logic
    const durationInSeconds = this.durationConverter.convert(duration, TimeUnit.SECOND);
    return Utilities.generateFormattedTime(durationInSeconds.length);
  }

  getDistanceUnitAbbreviation(unit) {
    const abbreviation = this.distanceUnitAbbreviations[unit];
    if (abbreviation == null) {
      throw new TypeError(`Unknown unit: ${unit}`)
    }

    return abbreviation;
  }
}
