'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

const expect = chai.expect;

import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';

import DistanceConverter from '../src/services/DistanceConverter';

describe('Distance converter', function() {
  const converter = new DistanceConverter();

  describe('Unit identifier', function() {
    it('identifies successfully', function() {
      expect(converter.getUnitConversionIdentifier(DistanceUnit.MILE)).to.equal('mi');
    });

    it('identifies unsuccessfully', function() {
      expect(() => converter.getUnitConversionIdentifier('foo')).to.throw(TypeError);
    });
  });

  const distance = 1.234;
  const kilometerDistance = 1.9858335873209383;
  const distanceInMiles = new Distance({
    value: distance,
    unit: DistanceUnit.MILE
  });
  const distanceInKilometers = new Distance({
    value: distance / 1000,
    unit: DistanceUnit.KILOMETER
  });

  describe('converts successfully', () => {
    before( () => {
      this.unitConversionIdentifier = sinon.stub(converter, 'getUnitConversionIdentifier').returns('mi');
    });

    after( () => {
      this.unitConversionIdentifier.restore();
    });

    it('converts miles', () => {
      expect(converter.convert(distanceInMiles, DistanceUnit.MILE)).to.eql(distanceInMiles);
    });

    it('converts kilometer', () => {
      expect(converter.convert(distanceInMiles, DistanceUnit.KILOMETER)).to.eql(distanceInKilometers);
    });
  });

  describe('converts unsuccessfully', () => {
    before( () => {
      this.unitConversionIdentifier = sinon.stub(converter, 'getUnitConversionIdentifier').returns('mi');
    });

    after( () => {
      this.unitConversionIdentifier.restore();
    });

    it('converts unsuccessfully', () => {
      expect(() => converter.convert(distanceInMiles, 'foo')).to.throw(TypeError);
    });
  });
});
