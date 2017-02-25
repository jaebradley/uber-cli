'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import PriceEstimate from '../src/data/PriceEstimate';
import PriceEstimatesTranslator from '../src/services/translators/PriceEstimatesTranslator';
import Range from '../src/data/Range';
import Distance from '../src/data/Distance';
import Unit from '../src/data/Unit';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Price Estimates Translator', function() {
  let localizedDisplayName = 'jae';
  const distanceValue = 1.234;
  let distance = new Distance({
    value: distanceValue,
    unit: Unit.MILE
  });
  let highEstimate = 2;
  let lowEstimate = 3;
  let duration = 4;
  let currencyCode = 'baebae';
  let surgeMultiplier = 5.678;
  let baseJson = {
    'localized_display_name': localizedDisplayName,
    'distance': distanceValue,
    'high_estimate': highEstimate,
    'low_estimate': lowEstimate,
    'duration': duration,
    'currency_code': currencyCode
  };

  it('tests price estimate translation without surge', function() {
    let expectedEstimate = new PriceEstimate({
      productName: localizedDisplayName,
      distance: distance,
      duration: duration,
      range: new Range({
        high: highEstimate,
        low: lowEstimate
      }),
      currencyCode: currencyCode
    });
    expect(PriceEstimatesTranslator.translateEstimate(baseJson)).to.eql(expectedEstimate);
  });

  it('tests price estimate translation with surge', function() {
    let json = baseJson;
    json['surgeMultiplier'] = surgeMultiplier;
    let expectedEstimate = new PriceEstimate({
      productName: localizedDisplayName,
      distance: distance,
      duration: duration,
      range: new Range({
        high: highEstimate,
        low: lowEstimate
      }),
      currencyCode: currencyCode,
      surgeMultiplier: surgeMultiplier
    });
    expect(PriceEstimatesTranslator.translateEstimate(json)).to.eql(expectedEstimate);
  });

  it('tests price estimates translation error cases', function() {
    let json = {};

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['localized_display_name'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['distance'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['high_estimate'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['low_estimate'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['duration'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(ReferenceError);
    json['currency_code'] = undefined;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
    json['localized_display_name'] = localizedDisplayName;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
    json['distance'] = distanceValue;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
    json['duration'] = duration;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
    json['high_estimate'] = highEstimate;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
    json['low_estimate'] = lowEstimate;

    expect(() => PriceEstimatesTranslator.translateEstimate(json)).to.throw(TypeError);
  });

  it('tests full translation error cases', function() {
    let json = {};
    expect(() => PriceEstimatesTranslator.translate(json)).to.throw(ReferenceError);

    json['prices'] = undefined;
    expect(() => PriceEstimatesTranslator.translate(json)).to.throw(TypeError);
  });
});
