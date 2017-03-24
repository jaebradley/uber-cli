'use es6';

import { List } from 'immutable';

import Coordinate from '../../data/Coordinate';
import Location from '../../data/Location';
import Utilities from '../../Utilities';

export default class Geocode {
  constructor() {
    this.STATUS_FIELD_NAME = 'status';
    this.EXPECTED_STATUS = 'OK';
    this.RESULTS_FIELD_NAME = 'results';
    this.FORMATTED_ADDRESS_FIELD_NAME = 'formatted_address';
    this.GEOMETRY_ADDRESS_FIELD_NAME = 'geometry';
    this.LOCATION_FIELD_NAME = 'location';
    this.LATITUDE_FIELD_NAME = 'lat';
    this.LONGITUDE_FIELD_NAME = 'lng';
  }

  translate(json) {
    if (!(this.STATUS_FIELD_NAME in json)) {
      throw new ReferenceError('expected status field');
    }

    if (json[this.STATUS_FIELD_NAME] !== this.EXPECTED_STATUS) {
      throw new TypeError('unexpected status value');
    }

    if (!(this.RESULTS_FIELD_NAME in json)) {
      throw new ReferenceError('expected results field');
    }

    let results = json[this.RESULTS_FIELD_NAME];
    if (!Array.isArray(results)) {
      throw new TypeError('expected array of results');
    }

    // return List(results.map(result => GeocodeTranslator.translateLocation(result)));
  }
}
