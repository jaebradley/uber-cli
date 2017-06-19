import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Distance from '../src/data/Distance';
import DistanceUnit from '../src/data/DistanceUnit';

import DistanceConverter from '../src/services/DistanceConverter';

chai.use(sinonChai);

const expect = chai.expect;

describe('Distance converter', () => {
  let sandbox;
  const converter = new DistanceConverter();

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

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
    it('converts miles', () => {
      sandbox.stub(converter, 'getUnitConversionIdentifier').returns('mi');
      expect(converter.convert(distanceInMiles, DistanceUnit.MILE)).to.eql(distanceInMiles);
    });

    it('converts kilometer', () => {
      sandbox.stub(converter, 'getUnitConversionIdentifier').returns('mi');
      expect(converter.convert(distanceInMiles, DistanceUnit.KILOMETER)).to.eql(distanceInKilometers); // eslint-disable-line max-len
    });
  });

  describe('converts unsuccessfully', () => {
    it('converts unsuccessfully', () => {
      sandbox.stub(converter, 'getUnitConversionIdentifier').returns('mi');
      expect(() => converter.convert(distanceInMiles, 'foo')).to.throw(TypeError);
    });
  });
});
