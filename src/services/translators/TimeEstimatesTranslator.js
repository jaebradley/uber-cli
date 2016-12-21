'use es6';

import {List} from 'immutable';

import TimeEstimate from '../../data/TimeEstimate';

export default class TimeEstimatesTranslator {
  static translate(response) {
    if (!('times' in response)) {
      throw new ReferenceError('expected times field');
    }

    let estimates = response['times'];
    if (!Array.isArray(estimates)) {
      throw new TypeError('expected times to be an array');
    }

    return List(estimates.map(estimate => TimeEstimatesTranslator.translateEstimate(estimate)));
  }

  static translateEstimate(estimate) {
    if (!('localized_display_name' in estimate)) {
      throw new ReferenceError('expected localized display name field');
    }

    if (!('estimate' in estimate)) {
      throw new ReferenceError('expected estimate field');
    }

    let displayName = estimate['localized_display_name'];
    if (typeof displayName !== 'string') {
      throw new TypeError('expected localized display name to be a string');
    }

    let estimateSeconds = estimate['estimate'];
    if (!Number.isInteger(estimateSeconds)) {
      throw new TypeError('expected seconds to be an integer');
    }

    return new TimeEstimate({
      productName: displayName,
      estimateSeconds: estimateSeconds
    });
  }
}
