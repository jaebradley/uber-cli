'use es6';

import {List, Record} from 'immutable';

import Location from './Location';

let defaults = {
  location: new Location(),
  estimates: List()
};

export default class TimeEstimates extends Record(defaults) {
}
