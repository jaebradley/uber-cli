'use es6';

import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';

const defaults = {
  startAddress: '',
  endAddress: '',
  distanceUnit: DistanceUnit.MILE
};

export default class PriceEstimateQuery extends Record(defaults) {
}
