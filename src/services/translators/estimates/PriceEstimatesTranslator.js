'use es6';

import { List } from 'immutable';

export default class PriceEstimatesTranslator {
  constuctor(priceEstimateTranslator) {
    this.priceEstimateTranslator = priceEstimateTranslator;
  }

  translate(estimates) {
    if (!(this.isValid(estimates))) {
      throw new Error(`Invalid estimates: ${estimates}`);
    }

    return List(estimates.map(estimate => this.priceEstimateTranslator.translate(estimate)));
  }

  isValid(estimates) {
    if (!(PriceEstimatesTranslator.getPricesFieldName() in estimates)) {
      return false;
    }

    if (!Array.isArray(estimates[PriceEstimatesTranslator.getPricesFieldName()])) {
      return false;
    }

    return true;
  }

  static getPricesFieldName() {
    return 'prices';
  }
}
