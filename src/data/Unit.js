'use es6';

import {Enum} from 'enumify';

export default class Unit extends Enum {
  static getDistanceUnit(name) {
    const unit = Unit.enumValueOf(name.toUpperCase())
    if (unit === Unit.SECOND) {
      throw new TypeError('Not a distance unit');
    }
    return unit;
  }
}

Unit.initEnum({
  MILE: {
    abbreviation: 'MI'
  },
  KILOMETER: {
    abbreviation: 'KM'
  },
  SECOND: {
  }
});
