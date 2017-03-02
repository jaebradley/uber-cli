'use es6';

import { Record } from 'immutable';

import DistanceUnit from './DistanceUnit';

const defaults = {
  value: 0,
  unit: DistanceUnit.MILE
};

export default class Distance extends Record(defaults) {}
