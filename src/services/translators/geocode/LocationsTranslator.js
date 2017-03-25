'use es6';

import { List } from 'immutable';

import LocationTranslator from './LocationTranslator';

export default class GeocodeLocationsTranslator {
  constructor() {
    this.STATUS_FIELD_NAME = 'status';
    this.EXPECTED_STATUS = 'OK';
    this.RESULTS_FIELD_NAME = 'results';
    this.locationTranslator = new LocationTranslator();
  }

  translate(json) {
    if (!this.isValid(json)) {
      throw new Error(`Invalid json: ${json}`);
    }

    return List(results.map(result => this.translate(result)));
  }

  isValid(json) {
    if (!(this.STATUS_FIELD_NAME in json)) {
      return false;
    }

    if (json[this.STATUS_FIELD_NAME] !== this.EXPECTED_STATUS) {
      return false;
    }

    if (!(this.RESULTS_FIELD_NAME in json)) {
      return false;
    }

    let results = json[this.RESULTS_FIELD_NAME];
    if (!Array.isArray(results)) {
      return false;
    }

    return true;
  }
}
