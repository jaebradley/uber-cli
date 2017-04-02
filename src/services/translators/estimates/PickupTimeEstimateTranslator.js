'use es6';

import Duration from '../../../data/Duration';
import TimeUnit from '../../../data/TimeUnit';
import PickupTimeEstimate from '../../../data/PickupTimeEstimate';

export default class PickupTimeEstimateTranslator {
  translate(estimate) {
    if (!this.isValid(estimate)) {
      throw new Error(`Invalid estimate: ${JSON.stringify(estimate)}`);
    }

    return new PickupTimeEstimate({
      productName: estimate[PickupTimeEstimateTranslator.getProductNameFieldName()],
      estimatedDuration: new Duration({
        length: estimate[PickupTimeEstimateTranslator.getEstimateFieldName()],
        unit: TimeUnit.SECOND
      })
    });
  }

  isValid(estimate) {
    if (!(PickupTimeEstimateTranslator.getProductNameFieldName() in estimate)) {
      return false;
    }

    if (!(PickupTimeEstimateTranslator.getEstimateFieldName() in estimate)) {
      return false;
    }

    const productName = estimate[PickupTimeEstimateTranslator.getProductNameFieldName()];
    if (typeof productName !== 'string') {
      return false;
    }

    let estimateSeconds = estimate[PickupTimeEstimateTranslator.getEstimateFieldName()];
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
