'use es6';

import CurrencySymbol from 'currency-symbol-map';
import { List, Map } from 'immutable';

import DistanceUnit from '../../data/DistanceUnit';
import Utilities from '../../Utilities';

export default class TripPriceEstimateRowFormatter {
  constructor(distanceConverter, durationConverter) {
    let distanceUnitAbbreviations = {};
    distanceUnitAbbreviations[DistanceUnit.MILE.name] = 'mi';
    distanceUnitAbbreviations[DistanceUnit.KILOMETER.name] = 'km';

    this.distanceUnitAbbreviations = Map(distanceUnitAbbreviations);
    this.distanceConverter = distanceConverter;
    this.durationConverter = durationConverter;
  }

  format(estimate, rowDistanceUnit, rowDurationUnit) {
    return List.of(
      this.formatRange(estimate.range),
      this.formatDistance(estimate.distance, rowDistanceUnit),
      this.formatDuration(estimate.duration, rowDurationUnit)
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

  formatDuration(duration, rowDurationUnit) {
    // TODO @jbradley Utilities currently formats time in seconds - build better formatting logic
    const durationInSeconds = this.durationConverter.convert(duration, rowDurationUnit);
    return Utilities.generateFormattedTime(durationInSeconds.length);
  }

  getDistanceUnitAbbreviation(unit) {
    const abbreviation = this.distanceUnitAbbreviations.get(unit.name);
    if (abbreviation == null) {
      throw new TypeError(`Unknown unit: ${unit}`)
    }

    return abbreviation;
  }
}
