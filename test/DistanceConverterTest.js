'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import Distance from '../src/data/Distance';
import Range from '../src/data/Range';
import Unit from '../src/data/Unit';

import DistanceConverter from '../src/services/DistanceConverter';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Distance converter test', function() {
  describe('Unit identifier test', function() {
    expect(DistanceConverter.getUnitConversionIdentifier(Unit.MILE)).to.equal('mi');
    expect(DistanceConverter.getUnitConversionIdentifier(Unit.KILOMETER)).to.equal('m');
  });

  const distance = 1.234;
  const kilometerDistance = 1.9858335873209383;
  const distanceInMiles = new Distance({
    value: distance,
    unit: Unit.MILE
  });
  const distanceInKilometers = new Distance({
    value: kilometerDistance,
    unit: Unit.KILOMETER
  });

  describe('Distance conversion test', function() {
    expect(DistanceConverter.convert(distanceInMiles, Unit.MILE)).to.eql(distanceInMiles);
    expect(DistanceConverter.convert(distanceInMiles, Unit.KILOMETER)).to.eql(distanceInKilometers);
  });
});
