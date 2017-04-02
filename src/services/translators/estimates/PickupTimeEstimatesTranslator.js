'use es6';

import { List } from 'immutable';

export default class PickupTimeEstimatesTranslator {
  constructor(estimateTranslator) {
    this.estimateTranslator = estimateTranslator;
  }

  translate(estimates) {
    if (!this.isValid(estimates)) {
      throw new Error(`Invalid estimates: ${JSON.stringify(estimates)}`);
    }

    const estimatedDurations = estimates[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()];

    return List(estimatedDurations.map(estimatedDuration => {
      return this.estimateTranslator.translate(estimatedDuration);
    }));
  }

  isValid(estimates) {
    if (!(PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName() in estimates)) {
      return false;
    }

    if (!Array.isArray(estimates[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()])) {
      return false;
    }

    return true;
  }

  static getEstimatedDurationsFieldName() {
    return 'times';
  }
}
