'use es6';

import {Record} from 'immutable';

import Coordinate from './Coordinate';

let defaults = {
  name: '',
  coordinate: new Coordinate(),
}

export default class Location extends Record(defaults) {
}
