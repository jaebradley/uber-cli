'use es6';

import { List } from 'immutable';

import Coordinate from '../../../data/Coordinate';
import Location from '../../../data/Location';
import Utilities from '../../../Utilities';

export default class GeocodeLocationTranslator {

  constructor() {
    this.FORMATTED_ADDRESS_FIELD_NAME = 'formatted_address';
    this.GEOMETRY_ADDRESS_FIELD_NAME = 'geometry';
    this.LOCATION_FIELD_NAME = 'location';
    this.LATITUDE_FIELD_NAME = 'lat';
    this.LONGITUDE_FIELD_NAME = 'lng';
  }

  translate(json) {
    if (!this.isValid(json)) {
      throw new Error(`Invalid json: ${json}`);
    }

    const location = json[this.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME];
    return new Location({
      name: json[this.FORMATTED_ADDRESS_NAME],
      coordinate: new Coordinate({
        latitude: location[this.LATITUDE_FIELD_NAME],
        longitude: location[this.LONGITUDE_FIELD_NAME]
      })
    });
  }

  isValid(json) {
    if (!(this.FORMATTED_ADDRESS_FIELD_NAME in json)) {
      return false;
    }

    if (!(this.GEOMETRY_ADDRESS_FIELD_NAME in json)) {
      return false;
    }

    let geometry = json[this.GEOMETRY_ADDRESS_FIELD_NAME];

    if (!(this.LOCATION_FIELD_NAME in geometry)) {
      return false;
    }

    let location = geometry[this.LOCATION_FIELD_NAME];

    if (!(this.LATITUDE_FIELD_NAME in location)) {
      return false;
    }

    if (!(this.LONGITUDE_FIELD_NAME in location)) {
      return false;
    }

    if (typeof json[this.FORMATTED_ADDRESS_FIELD_NAME] !== 'string') {
      return false;
    }

    if (!Utilities.isFloat(latitude)) {
      return false;
    }

    if (!Utilities.isFloat(longitude)) {
      return false;
    }

    return true;
  }
}
