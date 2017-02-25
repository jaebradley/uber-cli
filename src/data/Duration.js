'use es6';

import { Record } from 'immutable';

import Unit from './Unit';

const defaults = {
  value: 0,
  unit: Unit.SECOND
};

export default class Duration extends Record(defaults) {
}
