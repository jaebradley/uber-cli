'use es6';

import convert from 'convert-units';

import Duration from '../data/Duration';
import TimeUnit from '../data/TimeUnit';

export default class DurationConverter {
  static convert(duration, toUnit) {
    const fromUnitIdentifier = DurationConverter.getUnitConversionIdentifier(distance.unit);
    const toUnitIdentifier = DurationConverter.getUnitConversionIdentifier(toUnit);
    const convertedLength = convert(duration.length).from(fromUnitIdentifier).to(toUnitIdentifier);
    return new Duration({
      length: convertedLength,
      unit: toUnit
    });
  }

  static getUnitConversionIdentifier(unit) {
    switch (unit) {
      case TimeUnit.SECOND: {
        return 's';
      }

      case TimeUnit.MINUTE: {
        return 'min';
      }

      default: {
        throw new TypeError('Unknown unit');
      }
    }
  }
}
