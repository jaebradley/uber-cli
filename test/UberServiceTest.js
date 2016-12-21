'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';

import {List} from 'immutable';

import UberService from '../src/services/UberService';
import TimeEstimate from '../src/data/TimeEstimate';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

describe('Test Uber Service', function() {
  let service = new UberService();
  let address = '25 first street cambridge ma';
  let address2 = '114 line street somerville ma';

  it('tests time estimates fulfillment', function() {
    return service.getTimeEstimates(address).should.be.fulfilled;
  })

  it('tests time estimates fetching', function() {
    return service.getTimeEstimates(address)
                  .then(results => console.log(results));
  });

  it('tests price estimates fulfillment', function() {
    return service.getPriceEstimates(address, address2).should.be.fulfilled;
  })

  it('tests price estimates fetching', function() {
    return service.getPriceEstimates(address, address2)
                  .then(results => console.log(results));
  });
});
