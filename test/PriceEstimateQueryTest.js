'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import PriceEstimateQuery from '../src/data/PriceEstimateQuery';
import DistanceUnit from '../src/data/DistanceUnit';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Price Estimate Query', function() {
  const startAddress = 'foo';
  const endAddress = 'bar';

  it('Should return kilometer distance unit', function() {
    const expectedQuery = new PriceEstimateQuery({
      startAddress: startAddress,
      endAddress: endAddress,
      distanceUnit: DistanceUnit.KILOMETER
    });
    const calculatedQuery = PriceEstimateQuery.from(startAddress, endAddress, DistanceUnit.KILOMETER.name);
    expect(calculatedQuery).to.eql(expectedQuery);
  });

  it('Should return mile distance unit in default case', function() {
    const expectedQuery = new PriceEstimateQuery({
      startAddress: startAddress,
      endAddress: endAddress,
      distanceUnit: DistanceUnit.MILE
    });
    const calculatedQuery = PriceEstimateQuery.from(startAddress, endAddress, undefined);
    expect(calculatedQuery).to.eql(expectedQuery);
  });

  it('Should throw when it cannot identify a non-undefined distance unit', function() {
    expect( () => PriceEstimateQuery.from(startAddress, endAddress, 1) ).to.throw(TypeError);
  });
});
