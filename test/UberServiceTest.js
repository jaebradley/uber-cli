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

  it('tests data fulfillment', function() {
    return service.getTimeEstimates(address).should.be.fulfilled;
  })

  it('tests data fetching', function() {
    return service.getTimeEstimates(address)
                  .then(results => console.log(results));
  });
});
