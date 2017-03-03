'use es6';

import { Record } from 'immutable';

import TimeUnit from './TimeUnit';

const defaults = {
  length: 0,
  unit: TimeUnit.SECOND
};

export default class Duration extends Record(defaults) {
}
