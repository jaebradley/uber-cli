import chai from 'chai';

import BaseSymbolService from '../../../src/services/symbols/BaseSymbolService';

const expect = chai.expect;


describe('BaseSymbolService Test', () => {
  const service = new BaseSymbolService();

  it('should throw when getting vehicle symbol', () => {
    expect(() => service.getVehicleSymbol()).to.throw(Error);
  });

  it('should throw when getting price symbol', () => {
    expect(() => service.getPriceSymbol()).to.throw(Error);
  });

  it('should throw when getting trip distance symbol', () => {
    expect(() => service.getTripDistanceSymbol()).to.throw(Error);
  });

  it('should throw when getting duration symbol', () => {
    expect(() => service.getDurationSymbol()).to.throw(Error);
  });

  it('should throw when getting surge symbol', () => {
    expect(() => service.getSurgeSymbol()).to.throw(Error);
  });

  it('should throw when getting not applicable symbol', () => {
    expect(() => service.getNotApplicableSymbol()).to.throw(Error);
  });

  it('should throw when getting surge present symbol', () => {
    expect(() => service.getSurgePresentSymbol()).to.throw(Error);
  });

  it('should throw when getting destination symbol', () => {
    expect(() => service.getDestinationSymbol()).to.throw(Error);
  });

  it('should throw when getting origin symbol', () => {
    expect(() => service.getOriginSymbol()).to.throw(Error);
  });

  it('should throw when getting maximum distance symbol', () => {
    expect(() => service.getMaximumDistanceSymbol()).to.throw(Error);
  });
});
