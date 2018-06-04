import convert from 'convert-units';
import { Map } from 'immutable';

import TimeUnit from '../data/TimeUnit';

export default class DurationConverter {
  constructor() {
    const durationUnitAbbreviations = {};
    durationUnitAbbreviations[TimeUnit.SECOND.name] = 's';
    durationUnitAbbreviations[TimeUnit.MINUTE.name] = 'min';

    this.durationUnitAbbreviations = Map(durationUnitAbbreviations);
  }

  convert(duration, toUnit) {
    const fromUnitIdentifier = this.getUnitConversionIdentifier(duration.unit);
    const toUnitIdentifier = this.getUnitConversionIdentifier(toUnit);
    const convertedLength = convert(duration.length).from(fromUnitIdentifier).to(toUnitIdentifier);
    return {
      length: convertedLength,
      unit: toUnit,
    };
  }

  getUnitConversionIdentifier(unit) {
    const durationUnitAbbreviation = this.durationUnitAbbreviations.get(unit.name);
    if (typeof durationUnitAbbreviation === 'undefined') {
      throw new TypeError(`Unknown unit: ${unit}`);
    }

    return durationUnitAbbreviation;
  }
}
