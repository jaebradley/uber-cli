'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);

const expect = chai.expect;

import CommandExecutionService from '../../src/services/CommandExecutionService';

describe('Command Execution Service', () => {
  const service = new CommandExecutionService();
  describe('Test time estimates', () => {
    it('throws for invalid address type', () => {
      expect(() => service.executeTimeEstimates(1)).to.throw(TypeError, 'address should be a string');
    });

    it('returns a value', () => {
      const timeEstimates = new Promise((resolve, reject) => {
        resolve('foo');
      });
      const tableBuilder = sinon.stub(service.pickupTimeEstimatesTableBuilder, 'build').returns('baz');
      const timeEstimation = sinon.stub(service.uberService, 'getTimeEstimates').returns(timeEstimates);
      expect(service.executeTimeEstimates('bar')).to.eventually.equal('baz');
    });
  });
});
