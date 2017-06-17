import chai from 'chai';
import sinon from 'sinon';

import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';

import DistanceConverter from '../src/services/DistanceConverter';

const expect = chai.expect;

describe('Distance converter', () => {
  const converter = new DistanceConverter();

  describe('Unit identifier', () => {
    it('identifies successfully', () => {
      expect(converter.getUnitConversionIdentifier(DistanceUnit.MILE)).to.equal('mi');
    });

    it('identifies unsuccessfully', () => {
      expect(() => converter.getUnitConversionIdentifier('foo')).to.throw(TypeError);
    });
  });

  const distance = 1.234;
  const distanceInMiles = new Distance({
    value: distance,
    unit: DistanceUnit.MILE,
  });
  const distanceInKilometers = new Distance({
    value: distance / 1000,
    unit: DistanceUnit.KILOMETER,
  });

  describe('converts successfully', () => {
    before(() => {
      this.unitConversionIdentifier = sinon.stub(converter, 'getUnitConversionIdentifier').returns('mi');
    });

    after(() => {
      this.unitConversionIdentifier.restore();
    });

    it('converts miles', () => {
      expect(converter.convert(distanceInMiles, DistanceUnit.MILE)).to.eql(distanceInMiles);
    });

    it('converts kilometer', () => {
      expect(converter.convert(distanceInMiles, DistanceUnit.KILOMETER)).to.eql(distanceInKilometers); // eslint-disable-line max-len
    });
  });

  describe('converts unsuccessfully', () => {
    before(() => {
      this.unitConversionIdentifier = sinon.stub(converter, 'getUnitConversionIdentifier').returns('mi');
    });

    after(() => {
      this.unitConversionIdentifier.restore();
    });

    it('converts unsuccessfully', () => {
      expect(() => converter.convert(distanceInMiles, 'foo')).to.throw(TypeError);
    });
  });
});
