'use es6';

import Duration from '../../../data/Duration';
import TimeUnit from '../../../data/TimeUnit';
import TripDurationEstimate from '../../../data/TripDurationEstimate';

export default class TripDurationEstimateTranslator {
  translate(estimate) {
    if (!this.isValid(estimate)) {
      throw new Error(`Invalid estimate: ${estimate}`);
    }

    return new TripDurationEstimate({
      productName: estimate[TripDurationEstimateTranslator.getProductNameFieldName()],
      estimatedDuration: new Duration({
        length: estimate[TripDurationEstimateTranslator.getEstimateFieldName()],
        unit: TimeUnit.SECOND
      })
    });
  }

  isValid(estimate) {
    if (!(TripDurationEstimateTranslator.getProductNameFieldName() in estimate)) {
      return false;
    }

    if (!(TripDurationEstimateTranslator.getEstimateFieldName() in estimate)) {
      return false;
    }

    const productName = estimate[TripDurationEstimateTranslator.getProductNameFieldName()];
    if (typeof productName !== 'string') {
      return false;
    }

    let estimateSeconds = estimate[TripDurationEstimateTranslator.getEstimateFieldName()];
    if (!Number.isInteger(estimateSeconds)) {
      return false;
    }

    return true;
  }

  static getProductNameFieldName() {
    return 'localized_display_name';
  }

  static getEstimateFieldName() {
    return 'estimate';
  }
}
