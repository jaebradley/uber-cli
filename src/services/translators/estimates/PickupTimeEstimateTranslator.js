import TimeUnit from '../../../data/TimeUnit';

export default class PickupTimeEstimateTranslator {
  translate(estimate) {
    if (!this.isValid(estimate)) {
      throw new Error(`Invalid estimate: ${JSON.stringify(estimate)}`);
    }

    return {
      productName: estimate[PickupTimeEstimateTranslator.getProductNameFieldName()],
      estimatedDuration: {
        length: estimate[PickupTimeEstimateTranslator.getEstimateFieldName()],
        unit: TimeUnit.SECOND,
      },
    };
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

    const estimateSeconds = estimate[PickupTimeEstimateTranslator.getEstimateFieldName()];
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
