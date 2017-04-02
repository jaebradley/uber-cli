'use es6';

import CurrencySymbol from 'currency-symbol-map';
import { List, Map } from 'immutable';

import DistanceUnit from '../../data/DistanceUnit';

export default class TripPriceEstimateRowFormatter {
  constructor(distanceConverter, durationFormatter) {
    let distanceUnitAbbreviations = {};
    distanceUnitAbbreviations[DistanceUnit.MILE.name] = 'mi';
    distanceUnitAbbreviations[DistanceUnit.KILOMETER.name] = 'km';

    this.distanceUnitAbbreviations = Map(distanceUnitAbbreviations);
    this.distanceConverter = distanceConverter;
    this.durationFormatter = durationFormatter;
  }

  format(estimate, rowDistanceUnit, rowDurationUnit) {
    return List.of(
      this.formatRange(estimate.range),
      this.formatDistance(estimate.distance, rowDistanceUnit),
      this.durationFormatter.format(estimate.duration)
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

  getDistanceUnitAbbreviation(unit) {
    const abbreviation = this.distanceUnitAbbreviations.get(unit.name);
    if (abbreviation == null) {
      throw new TypeError(`Unknown unit: ${unit}`)
    }

    return abbreviation;
  }
}
