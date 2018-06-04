/* eslint-disable no-console */

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';

import UberService from '../src/services/UberService';
import DistanceUnit from '../src/data/DistanceUnit';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

describe('Test Uber Service', () => {
  const service = new UberService();
  const address = '25 first street cambridge ma';
  const address2 = '114 line street somerville ma';
  const priceEstimateQuery = {
    startAddress: address,
    endAddress: address2,
    distanceUnit: DistanceUnit.MILE,
  };

  it('tests time estimates fulfillment', () => service.getTimeEstimates(address).should.be.fulfilled);

  it('tests time estimates fetching', () =>
    service.getTimeEstimates(address)
      .then(results => console.log(results)),
  );

  it('tests price estimates fulfillment', () => service.getPriceEstimates(priceEstimateQuery).should.be.fulfilled);

  it('tests price estimates fetching', () =>
    service.getPriceEstimates(priceEstimateQuery)
      .then(results => console.log(results)),
  );
});
