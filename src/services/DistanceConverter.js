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
      case DistanceUnit.KILOMETER: {
        // Note divided by 1000 because convert library does not have kilometers, so using meters
        return new Distance({
          value: convertedValue / 1000,
          unit: DistanceUnit.KILOMETER
        });
      }

      case DistanceUnit.MILE: {
        return new Distance({
          value: convertedValue,
          unit: DistanceUnit.MILE
        });
      }

      default: {
        throw new TypeError('Unexpected Unit');
      }
    }
  }

  static getUnitConversionIdentifier(unit) {
    switch (unit) {
      case DistanceUnit.MILE: {
        return 'mi';
      }

      case DistanceUnit.KILOMETER: {
        return 'm';
      }

      default: {
        throw new TypeError('Unknown unit');
      }
    }
  }
}
