'use es6';

import { Map } from 'immutable';

import Distance from '../../data/Distance';
import DistanceConverter from '../DistanceConverter';
import DistanceUnit from '../../data/DistanceUnit';
import Duration from '../../data/Duration';
import PriceEstimate from '../../data/PriceEstimate';
import PriceRange from '../../data/PriceRange';
import TimeUnit from '../../data/TimeUnit';
import Utilities from '../../Utilities';

export default class PriceEstimateTranslator {
  translate(estimate) {
    if (!this.isValid(estimate)) {
      throw new Error(`invalid estimate: ${estimate}`);
    }

    const distance = new Distance({
      value: estimate[PriceEstimateTranslator.getDistanceFieldName()],
      unit: DistanceUnit.MILE
    });

    // Uber returns duration in seconds
    const duration = new Duration({
      length: estimate[PriceEstimateTranslator.getDurationFieldName()],
      unit: TimeUnit.SECOND
    });

    const range = new PriceRange({
      high: estimate[PriceEstimateTranslator.getHighEstimateFieldName()],
      low: estimate[PriceEstimateTranslator.getLowEstimateFieldName()],
      currencyCode: estimate[PriceEstimateTranslator.getCurrencyCodeFieldName()]
    });

    let args = Map({
      productName: estimate[PriceEstimateTranslator.getProductNameFieldName()],
      distance: distance,
      duration: duration,
      range: range
    });

    if (PriceEstimateTranslator.getSurgeMultiplierFieldName() in estimate) {
      args.set('surgeMultiplier', estimate[PriceEstimateTranslator.getSurgeMultiplierFieldName()]);
    }

    return new PriceEstimate(args);
  }

  isValid(estimate) {
    if (!(PriceEstimateTranslator.getProductNameFieldName() in estimate)) {
      return false;
    }

    if (!(PriceEstimateTranslator.getDistanceFieldName() in estimate)) {
      return false;
    }

    if (!(PriceEstimateTranslator.getHighEstimateFieldName() in estimate)) {
      return false;
    }

    if (!(PriceEstimateTranslator.getLowEstimateFieldName() in estimate)) {
      return false;
    }

    if (!(PriceEstimateTranslator.getDurationFieldName() in estimate)) {
      return false;
    }

    if (!(PriceEstimateTranslator.getCurrencyCodeFieldName() in estimate)) {
      return false;
    }

    const productName = estimate[PriceEstimateTranslator.getProductNameFieldName()];
    if (typeof productName !== 'string') {
      return false;
    }

    const distance = estimate[PriceEstimateTranslator.getDistanceFieldName()];
    if !(Utilities.isFloat(distance)) {
      return false;
    }

    const duration = estimate[PriceEstimateTranslator.getDurationFieldName()];
    if (!Number.isInteger(duration)) {
      return false;
    }

    // estimates can be null for non-applicable products like Taxi
    const highEstimate = estimate[PriceEstimateTranslator.getHighEstimateFieldName()];
    if (highEstimate !== null && !Number.isInteger(highEstimate)) {
      return false;
    }

    const lowEstimate = estimate[PriceEstimateTranslator.getLowEstimateFieldName()];
    if (lowEstimate !== null && !Number.isInteger(lowEstimate)) {
      return false;
    }

    // currency code can be null for non-applicable products like Taxi
    const currencyCode = estimate[PriceEstimateTranslator.getCurrencyCodeFieldName()];
    if (currencyCode !== null && typeof currencyCode !== 'string') {
      return false;
    }

    if (PriceEstimateTranslator.getSurgeMultiplierFieldName() in estimate) {
      if (!Utilities.isFloat(estimate[PriceEstimateTranslator.getSurgeMultiplierFieldName()])) {
        return false;
      }
    }

    return true;
  }

  static getProductNameFieldName() {
    return 'localized_display_name';
  }

  static getDistanceFieldName() {
    return 'distance';
  }

  static getHighEstimateFieldName() {
    return 'high_estimate';
  }

  static getLowEstimateFieldName() {
    return 'low_estimate';
  }

  static getDurationFieldName() {
    return 'duration';
  }

  static getCurrencyCodeFieldName() {
    return 'currency_code';
  }

  static getSurgeMultiplierFieldName() {
    return 'surgeMultiplier';
  }
}
