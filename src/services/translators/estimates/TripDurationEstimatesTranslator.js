'use es6';

import { List } from 'immutable';

export default class TripDurationEstimatesTranslator {
  constructor(tripDurationEstimateTranslator) {
    this.tripDurationEstimateTranslator = tripDurationEstimateTranslator;
  }

  translate(estimates) {
    if (!this.isValid(estimates)) {
      throw new Error(`Invalid estimates: ${estimates}`);
    }

    const estimatedDurations = estimates[TripDurationEstimatesTranslator.getEstimatedDurationsFieldName()];

    return List(estimatedDurations.map(estimatedDuration => {
      this.tripDurationEstimateTranslator.translate(estimatedDuration)
    }));
  }

  isValid(estimates) {
    if (!(TripDurationEstimatesTranslator.getEstimatedDurationsFieldName() in estimate)) {
      return false;
    }

    if (!Array.isArray(estimate[TripDurationEstimatesTranslator.getEstimatedDurationsFieldName()])) {
      return false;
    }

    return true;
  }

  static getEstimatedDurationsFieldName() {
    return 'times';
  }
}
