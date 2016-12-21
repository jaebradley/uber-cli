'use es6';

import {Record} from 'immutable';

let defaults = {
  latitude: 0,
  longitude: 0,
};

export default class Coordinate extends Record(defaults) {
}
