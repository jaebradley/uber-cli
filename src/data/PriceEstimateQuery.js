'use es6';

import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';

const defaults = {
  startAddress: '',
  endAddress: '',
  distanceUnit: DistanceUnit.MILE
};

export default class PriceEstimateQuery extends Record(defaults) {
  static from(startAddress, endAddress, distanceUnitName) {
    const distanceUnit = DistanceUnit.enumValueOf(distanceUnitName.toUpperCase());
    if (typeof distanceUnit == 'undefined') {
      throw new TypeError('Unknown distance unit');
    }

    return new PriceEstimateQuery({
      startAddress: startAddress,
      endAddress: endAddress,
      distanceUnit: distanceUnit
    });
  }
}
