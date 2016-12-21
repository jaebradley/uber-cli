'use es6';

import {Record} from 'immutable';

import Coordinate from './Coordinate';

let defaults = {
  name: '',
  location: new Coordinate(),
}

export default class Address extends Record(defaults) {
}
