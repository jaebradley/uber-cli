'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import PriceEstimate from '../src/data/PriceEstimate';
import Range from '../src/data/Range';
import Unit from '../src/data/Unit';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Price estimate test', function() {
  const mileDistance = 1.234;
  const kilometerDistance = 1.9859;
  const defaultPriceEstimate = new PriceEstimate({
    distance: mileDistance
  });

  describe('Price estimate distance conversion test', function() {
    expect(defaultPriceEstimate.getConvertedDistance(Unit.MILE)).to.eql(mileDistance);
    expect(defaultPriceEstimate.getConvertedDistance(Unit.KILOMETER)).to.eql(kilometerDistance);
  });
});
