'use es6';

import { Record } from 'immutable';
import convert from 'convert-units';

import Unit from './Unit';

const defaults = {
  value: 0,
  unit: Unit.MILE
};

export default class Distance extends Record(defaults) {
}
