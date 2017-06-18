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

  describe('#executePriceEstimates', () => {
    const validAddress = 'foo';
    const emptyAddress = '  ';

    it('throws for invalid start address type', () => {
      expect(() => service.executePriceEstimates(1, validAddress, DistanceUnit.MILE)).to.throw(TypeError, 'A valid start address is required');
    });

    it('throws for empty start address', () => {
      expect(() => service.executePriceEstimates(emptyAddress, validAddress, DistanceUnit.MILE)).to.throw(TypeError, 'A valid start address is required');
    });

    it('throws for invalid end address type', () => {
      expect(() => service.executePriceEstimates(validAddress, 1, DistanceUnit.MILE)).to.throw(TypeError, 'A valid end address is required');
    });

    it('throws for empty end address', () => {
      expect(() => service.executePriceEstimates(validAddress, emptyAddress, DistanceUnit.MILE)).to.throw(TypeError, 'A valid end address is required');
    });

    it('throws for undefined distance unit name', () => {
      expect(() => service.executePriceEstimates('foo', 'bar', 'baz')).to.throw(TypeError, 'Unknown distance unit: baz');
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

  describe('#executeTimeEstimates', () => {
    it('throws for invalid address type', () => {
      expect(() => service.executeTimeEstimates(1)).to.throw(TypeError, 'A valid address is required');
    });

    it('throws for empty address', () => {
      expect(() => service.executeTimeEstimates('   ').to.throw(TypeError, 'A valid address is required'));
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
