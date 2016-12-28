'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import TimeEstimate from '../src/data/TimeEstimate';
import TimeEstimatesTranslator from '../src/services/translators/TimeEstimatesTranslator';

chai.use(chaiImmutable);
let expect = chai.expect;

describe('Test Time Estimates Translator', function() {
  let localizedDisplayName = 'jae';
  let estimate = 1;
  let timeEstimate = {
    'localized_display_name': localizedDisplayName,
    'estimate': estimate,
  };
  let expectedTimeEstimate = new TimeEstimate({
    productName: localizedDisplayName,
    estimateSeconds: estimate
  });

  let timeEstimates = {
    'times': [
      timeEstimate,
      timeEstimate
    ]
  };
  let expectedTimeEstimates = List.of(expectedTimeEstimate, expectedTimeEstimate);

  it('should translate estimate', function() {
    expect(TimeEstimatesTranslator.translateEstimate(timeEstimate)).to.eql(expectedTimeEstimate);
  });

  it('should throw when attempting to translate estimate', function() {
    let incorrectlyFormattedTimeEstimate = {};
    expect(() => TimeEstimatesTranslator.translateEstimate(incorrectlyFormattedTimeEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedTimeEstimate['localized_display_name'] = 1;
    expect(() => TimeEstimatesTranslator.translateEstimate(incorrectlyFormattedTimeEstimate)).to.throw(ReferenceError);

    incorrectlyFormattedTimeEstimate['estimate'] = 'foo';
    expect(() => TimeEstimatesTranslator.translateEstimate(incorrectlyFormattedTimeEstimate)).to.throw(TypeError);

    incorrectlyFormattedTimeEstimate['localized_display_name'] = 'bar';
    expect(() => TimeEstimatesTranslator.translateEstimate(incorrectlyFormattedTimeEstimate)).to.throw(TypeError);
  });

  it('should translate estimates', function() {
    expect(TimeEstimatesTranslator.translate(timeEstimates)).to.eql(expectedTimeEstimates);
  });

  it('should throw when attempting to translate estimates', function() {
    let incorrectlyFormattedEstimates = {};
    expect(() => TimeEstimatesTranslator.translate(incorrectlyFormattedEstimates)).to.throw(ReferenceError);

    incorrectlyFormattedEstimates['times'] = 1;
    expect(() => TimeEstimatesTranslator.translate(incorrectlyFormattedEstimates)).to.throw(TypeError);
  });
});
