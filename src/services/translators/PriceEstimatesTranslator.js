'use es6';

import {List, Map} from 'immutable';

import DistanceConverter from '../DistanceConverter';
import PriceEstimate from '../../data/PriceEstimate';
import Range from '../../data/Range';
import Distance from '../../data/Distance';
import Duration from '../../data/Duration';
import Unit from '../../data/Unit';
import Utilities from '../../Utilities';

export default class PriceEstimatesTranslator {
  static translate(response, distanceUnit) {
    if (!('prices' in response)) {
      throw new ReferenceError('expected prices field');
    }

    let estimates = response['prices'];
    if (!Array.isArray(estimates)) {
      throw new TypeError('expected prices to be an array');
    }

    return List(estimates.map(estimate => PriceEstimatesTranslator.translateEstimate(estimate, distanceUnit)));
  }

  static translateEstimate(estimate, distanceUnit) {
    if (!('localized_display_name' in estimate)) {
      throw new ReferenceError('expected localized display name field');
    }

    if (!('distance' in estimate)) {
      throw new ReferenceError('expected distance field');
    }

    if (!('high_estimate' in estimate)) {
      throw new ReferenceError('expected high estimate field');
    }

    if (!('low_estimate' in estimate)) {
      throw new ReferenceError('expected low_estimate field');
    }

    if (!('duration' in estimate)) {
      throw new ReferenceError('expected duration field');
    }

    if (!('currency_code' in estimate)) {
      throw new ReferenceError('expected currency code field');
    }

    let displayName = estimate['localized_display_name'];
    if (typeof displayName !== 'string') {
      throw new TypeError('expected localized display name to be a string');
    }

    let distance = estimate['distance'];
    if (!Utilities.isFloat(distance)) {
      throw new TypeError('expected distance to be an integer');
    }

    let duration = estimate['duration'];
    if (!Number.isInteger(duration)) {
      throw new TypeError('expected duration to be an integer');
    }

    // estimates can be null for non-applicable products like Taxi
    let highEstimate = estimate['high_estimate'];
    if (highEstimate === null) {
      highEstimate = undefined;
    } else if (!Number.isInteger(highEstimate)) {
      throw new TypeError('expected high estimate to be an integer');
    }

    let lowEstimate = estimate['low_estimate'];
    if (lowEstimate === null) {
      lowEstimate = undefined;
    } else if (!Number.isInteger(lowEstimate)) {
      throw new TypeError('expected low estimate to be an integer');
    }

    let currencyCode = estimate['currency_code'];

    // currency code can be null for non-applicable products like Taxi
    if (currencyCode === null) {
      currencyCode = undefined;
    } else if (typeof currencyCode !== 'string') {
      throw new TypeError('expected currency code name to be a string');
    }
    // Uber returns miles
    // https://developer.uber.com/docs/riders/references/api/v1.2/estimates-price-get
    const uberDistance = new Distance({
      value: distance,
      unit: Unit.MILE
    });
    const convertedDistance = DistanceConverter.convert(uberDistance, distanceUnit);

    let args = Map({
      productName: displayName,
      distance: convertedDistance,
      // Uber returns seconds
      duration: new Duration({
        value: duration,
        unit: Unit.SECOND
      }),
      range: new Range({
        high: highEstimate,
        low: lowEstimate,
        currencyCode: currencyCode
      })
    });

    // wont show up unless > 1
    if ('surgeMultiplier' in estimate) {
      let surge = estimate['surgeMultiplier'];
      if (!Utilities.isFloat(surge)) {
        throw new TypeError('expected surge to be a float');
      }

      args = args.set('surgeMultiplier', surge);
    }

    return new PriceEstimate(args);
  }
}
