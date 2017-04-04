'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.use(sinonChai);

import { List } from 'immutable';

import TimeEstimates from '../../src/data/TimeEstimates';
import PriceEstimates from '../../src/data/PriceEstimates';

import UberService from '../../src/services/UberService';

const expect = chai.expect;

describe('Uber Service', () => {
  const uberService = new UberService();

  describe('first location', () => {
    it('throws', () => {
      const geocodeLocations = sinon.stub(uberService.geocodeService, 'getLocations')
                                    .returns(Promise.resolve(List()));

      expect(uberService.getFirstLocation()).to.be.rejectedWith(RangeError);

      geocodeLocations.restore();
    });

    it('succeeds', () => {
      const geocodeLocations = sinon.stub(uberService.geocodeService, 'getLocations')
                                    .returns(Promise.resolve(List.of(1, 2, 3)));

      expect(uberService.getFirstLocation()).to.eventually.eql(1);

      geocodeLocations.restore();
    });
  });
});
