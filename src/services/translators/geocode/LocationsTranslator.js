import { List } from 'immutable';

export default class LocationsTranslator {
  constructor(locationTranslator) {
    this.STATUS_FIELD_NAME = 'status';
    this.EXPECTED_STATUS = 'OK';
    this.RESULTS_FIELD_NAME = 'results';
    this.locationTranslator = locationTranslator;
  }

  translate(json) {
    if (!this.isValid(json)) {
      throw new Error(`Invalid json: ${json}`);
    }

    const results = json[this.RESULTS_FIELD_NAME];

    return List(results.map(result => this.locationTranslator.translate(result)));
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

    const results = json[this.RESULTS_FIELD_NAME];
    if (!Array.isArray(results)) {
      return false;
    }

    return true;
  }
}
