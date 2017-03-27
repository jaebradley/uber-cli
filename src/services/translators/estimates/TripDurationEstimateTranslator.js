'use es6';

import {List} from 'immutable';

import TripDurationEstimate from '../../data/TripDurationEstimate';
import Duration from '../../data/Duration';
import TimeUnit from '../../data/TimeUnit';

export default class TripDurationEstimateTranslator {
  translate(estimate) {
    if (this.isValid()) {
      throw new Error(`Invalid estimate: ${estimate}`);
    }

    return new TripDurationEstimate({
      productName: estimate[TripDurationEstimateTranslator.getLocalizedDisplayNameFieldName()],
      estimatedDuration: new Duration({
        length: estimate[TripDurationEstimateTranslator.getEstimateFieldName()];,
        unit: TimeUnit.SECOND
      })
    });
  }

  isValid(estimate) {
    if (!(TripDurationEstimateTranslator.getLocalizedDisplayNameFieldName() in estimate)) {
      return false;
    }

    if (!(TripDurationEstimateTranslator.getEstimateFieldName() in estimate)) {
      return false;
    }

    const productName = estimate[TripDurationEstimateTranslator.getLocalizedDisplayNameFieldName()];
    if (typeof productName !== 'string') {
      return false;
    }

    let estimateSeconds = estimate[TripDurationEstimateTranslator.getEstimateFieldName()];
    if (!Number.isInteger(estimateSeconds)) {
      return false;
    }

    return true;
  }

  static getLocalizedDisplayNameFieldName() {
    return 'localized_display_name';
  }

  static getEstimateFieldName() {
    return 'estimate';
  }
}
