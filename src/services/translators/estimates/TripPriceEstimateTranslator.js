import { Map } from 'immutable';

import DistanceUnit from '../../../data/DistanceUnit';
import Duration from '../../../data/Duration';
import TimeUnit from '../../../data/TimeUnit';
import TripPriceEstimate from '../../../data/TripPriceEstimate';
import Utilities from '../../Utilities';

export default class TripPriceEstimateTranslator {
  translate(estimate) {
    if (!this.isValid(estimate)) {
      throw new Error(`invalid estimate: ${estimate}`);
    }

    const distance = {
      value: estimate[TripPriceEstimateTranslator.getDistanceFieldName()],
      unit: DistanceUnit.MILE,
    };

    // Uber returns duration in seconds
    const duration = new Duration({
      length: estimate[TripPriceEstimateTranslator.getDurationFieldName()],
      unit: TimeUnit.SECOND,
    });

    const range = {
      high: estimate[TripPriceEstimateTranslator.getHighEstimateFieldName()],
      low: estimate[TripPriceEstimateTranslator.getLowEstimateFieldName()],
      currencyCode: estimate[TripPriceEstimateTranslator.getCurrencyCodeFieldName()],
    };

    let args = Map({
      productName: estimate[TripPriceEstimateTranslator.getProductNameFieldName()],
      distance,
      duration,
      range,
    });

    if (TripPriceEstimateTranslator.getSurgeMultiplierFieldName() in estimate) {
      args = args.set('surgeMultiplier', estimate[TripPriceEstimateTranslator.getSurgeMultiplierFieldName()]);
    }

    return new TripPriceEstimate(args);
  }

  isValid(estimate) {
    if (!(TripPriceEstimateTranslator.getProductNameFieldName() in estimate)) {
      return false;
    }

    if (!(TripPriceEstimateTranslator.getDistanceFieldName() in estimate)) {
      return false;
    }

    if (!(TripPriceEstimateTranslator.getHighEstimateFieldName() in estimate)) {
      return false;
    }

    if (!(TripPriceEstimateTranslator.getLowEstimateFieldName() in estimate)) {
      return false;
    }

    if (!(TripPriceEstimateTranslator.getDurationFieldName() in estimate)) {
      return false;
    }

    if (!(TripPriceEstimateTranslator.getCurrencyCodeFieldName() in estimate)) {
      return false;
    }

    const productName = estimate[TripPriceEstimateTranslator.getProductNameFieldName()];
    if (typeof productName !== 'string') {
      return false;
    }

    const distance = estimate[TripPriceEstimateTranslator.getDistanceFieldName()];
    if (!Utilities.isFloat(distance)) {
      return false;
    }

    const duration = estimate[TripPriceEstimateTranslator.getDurationFieldName()];
    if (!Number.isInteger(duration)) {
      return false;
    }

    // estimates can be null for non-applicable products like Taxi
    const highEstimate = estimate[TripPriceEstimateTranslator.getHighEstimateFieldName()];
    if (highEstimate !== null && !Number.isInteger(highEstimate)) {
      return false;
    }

    const lowEstimate = estimate[TripPriceEstimateTranslator.getLowEstimateFieldName()];
    if (lowEstimate !== null && !Number.isInteger(lowEstimate)) {
      return false;
    }

    // currency code can be null for non-applicable products like Taxi
    const currencyCode = estimate[TripPriceEstimateTranslator.getCurrencyCodeFieldName()];
    if (currencyCode !== null && typeof currencyCode !== 'string') {
      return false;
    }

    if (TripPriceEstimateTranslator.getSurgeMultiplierFieldName() in estimate) {
      if (!Utilities.isFloat(estimate[TripPriceEstimateTranslator.getSurgeMultiplierFieldName()])) {
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
