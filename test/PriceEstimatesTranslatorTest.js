'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';
import Duration from '../src/data/Duration';
import PriceEstimate from '../src/data/PriceEstimate';
import PriceEstimatesTranslator from '../src/services/translators/PriceEstimatesTranslator';
import PriceRange from '../src/data/PriceRange';
import TimeUnit from '../src/data/TimeUnit';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Price Estimates Translator', function() {
  let localizedDisplayName = 'jae';
  const distanceValue = 1.234;
  const distance = new Distance({
    value: distanceValue,
    unit: DistanceUnit.MILE
  });
  let highEstimate = 2;
  let lowEstimate = 3;
  let durationLength = 4;
  let duration = new Duration({
    length: durationLength,
    unit: TimeUnit.SECOND
  });
  let currencyCode = 'baebae';
  let surgeMultiplier = 5.678;
  let baseJson = {
    'localized_display_name': localizedDisplayName,
    'distance': distanceValue,
    'high_estimate': highEstimate,
    'low_estimate': lowEstimate,
    'duration': durationLength,
    'currency_code': currencyCode
  };

  it('tests price estimate translation without surge', function() {
    let expectedEstimate = new PriceEstimate({
      productName: localizedDisplayName,
      distance: distance,
      duration: duration,
      range: new PriceRange({
        high: highEstimate,
        low: lowEstimate,
        currencyCode: currencyCode
      })
    });
    expect(PriceEstimatesTranslator.translateEstimate(baseJson, DistanceUnit.MILE)).to.eql(expectedEstimate);
  });

  it('tests price estimate translation with surge', function() {
    let json = baseJson;
    json['surgeMultiplier'] = surgeMultiplier;
    let expectedEstimate = new PriceEstimate({
      productName: localizedDisplayName,
      distance: distance,
      duration: duration,
      range: new PriceRange({
        high: highEstimate,
        low: lowEstimate,
        currencyCode: currencyCode
      }),
      surgeMultiplier: surgeMultiplier
    });
    expect(PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.eql(expectedEstimate);
  });

  it('tests price estimates translation error cases', function() {
    let json = {};

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['localized_display_name'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['distance'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['high_estimate'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['low_estimate'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['duration'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(ReferenceError);
    json['currency_code'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
    json['localized_display_name'] = localizedDisplayName;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
    json['distance'] = distance;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
    json['duration'] = duration;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
    json['high_estimate'] = highEstimate;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
    json['low_estimate'] = lowEstimate;

    expect(() => PriceEstimatesTranslator.translateEstimate(json, DistanceUnit.MILE)).to.throw(TypeError);
  });

  it('tests full translation error cases', function() {
    let json = {};
    expect(() => PriceEstimatesTranslator.translate(json, DistanceUnit.MILE)).to.throw(ReferenceError);

    json['prices'] = undefined;
    expect(() => PriceEstimatesTranslator.translate(json, DistanceUnit.MILE)).to.throw(TypeError);
  });
});
