'use es6';

import {expect} from 'chai';

import PriceEstimate from '../src/data/PriceEstimate';
import PriceEstimatesTranslator from '../src/services/translators/PriceEstimatesTranslator';
import Range from '../src/data/Range';
import Utilities from '../src/Utilities';

describe('Tests Utilities', function() {
  it('tests is float', function() {
    expect(Utilities.isFloat('jae')).to.be.false;
    expect(Utilities.isFloat(undefined)).to.be.false;
    expect(Utilities.isFloat(null)).to.be.false;
    expect(Utilities.isFloat([])).to.be.false;
    expect(Utilities.isFloat(1)).to.be.false;
    expect(Utilities.isFloat(-1.2345)).to.be.true;
  });
});
