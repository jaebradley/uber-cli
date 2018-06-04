export default class PickupTimeEstimatesTranslator {
  constructor(estimateTranslator) {
    this.estimateTranslator = estimateTranslator;
  }

  translate(estimates) {
    if (!this.isValid(estimates)) {
      throw new Error(`Invalid estimates: ${JSON.stringify(estimates)}`);
    }

    const estimatedDurations = estimates[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()]; // eslint-disable-line max-len

    return estimatedDurations.map(estimatedDuration => this.estimateTranslator.translate(estimatedDuration)); // eslint-disable-line max-len
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
