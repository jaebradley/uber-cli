'use es6';

import convert from 'convert-units';

import Distance from '../data/Distance';
import DistanceUnit from '../data/DistanceUnit';

export default class DistanceConverter {
  static convert(distance, toUnit) {
    const fromUnitIdentifier = DistanceConverter.getUnitConversionIdentifier(distance.unit);
    const toUnitIdentifier = DistanceConverter.getUnitConversionIdentifier(toUnit);
    const convertedValue = convert(distance.value).from(fromUnitIdentifier).to(toUnitIdentifier);

    switch (toUnit) {
      case Unit.KILOMETER: {
        // Note divided by 1000 because convert library does not have kilometers, so using meters
        return new Distance({
          value: convertedValue / 1000,
          unit: Unit.KILOMETER
        });
      }

      case Unit.MILE: {
        return new Distance({
          value: convertedValue,
          unit: Unit.MILE
        });
      }

      default: {
        throw new TypeError('Unexpected Unit');
      }
    }
  }

  static getUnitConversionIdentifier(unit) {
    switch (unit) {
      case Unit.MILE: {
        return 'mi';
      }

      case Unit.KILOMETER: {
        return 'm';
      }

      default: {
        throw new TypeError('Unknown unit');
      }
    }
  }
}
