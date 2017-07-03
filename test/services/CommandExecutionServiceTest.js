'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import CommandExecutionService from '../../src/services/CommandExecutionService';
import DistanceUnit from '../../src/data/DistanceUnit';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;

describe('Command Execution Service', () => {
  const service = new CommandExecutionService();

  describe('Price estimates', () => {
    it('throws for empty start address type', () => {
      expect(() => service.executePriceEstimates(1, '', DistanceUnit.MILE)).to.throw(TypeError, 'Start and End addresses (-s \'<address>\' -e \'<address>\') are required.');
    });

    it('throws for empty end address type', () => {
      expect(() => service.executePriceEstimates('foo', null, DistanceUnit.MILE)).to.throw(TypeError, 'Start and End addresses (-s \'<address>\' -e \'<address>\') are required.');
    });

    it('throws for undefined distance unit name', () => {
      expect(() => service.executePriceEstimates('foo', 'bar', 'baz')).to.throw(TypeError);
    });

    it('returns a value', () => {
      const priceEstimates = new Promise((resolve, reject) => resolve('foo')); // eslint-disable-line no-unused-vars
      const priceEstimater = sinon.stub(service.uberService, 'getPriceEstimates').returns(priceEstimates);
      const tableBuilder = sinon.stub(service.tripPriceEstimatesTableBuilder, 'build').returns('jaebaebae');
      expect(service.executePriceEstimates('foo', 'bar', undefined)).to.eventually.equal('jaebaebae');
      priceEstimater.restore();
      tableBuilder.restore();
    });
  });

  describe('Time estimates', () => {
    it('throws for invalid address type', () => {
      expect(() => service.executeTimeEstimates(1)).to.throw(TypeError, 'Address should be a string');
    });

    it('returns a value', () => {
      const timeEstimates = new Promise((resolve, reject) => resolve('foo')); // eslint-disable-line no-unused-vars
      const tableBuilder = sinon.stub(service.pickupTimeEstimatesTableBuilder, 'build').returns('baz');
      const timeEstimation = sinon.stub(service.uberService, 'getTimeEstimates').returns(timeEstimates);
      expect(service.executeTimeEstimates('bar')).to.eventually.equal('baz');
      tableBuilder.restore();
      timeEstimation.restore();
    });
  });
});
