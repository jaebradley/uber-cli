import BaseSymbolService from '../../../src/services/symbols/BaseSymbolService';

describe('BaseSymbolService Test', () => {
  const service = new BaseSymbolService();

  it('should throw when getting vehicle symbol', () => {
    expect(() => service.getVehicleSymbol()).toThrow();
  });

  it('should throw when getting price symbol', () => {
    expect(() => service.getPriceSymbol()).toThrow();
  });

  it('should throw when getting trip distance symbol', () => {
    expect(() => service.getTripDistanceSymbol()).toThrow();
  });

  it('should throw when getting duration symbol', () => {
    expect(() => service.getDurationSymbol()).toThrow();
  });

  it('should throw when getting surge symbol', () => {
    expect(() => service.getSurgeSymbol()).toThrow();
  });

  it('should throw when getting not applicable symbol', () => {
    expect(() => service.getNotApplicableSymbol()).toThrow();
  });

  it('should throw when getting surge present symbol', () => {
    expect(() => service.getSurgePresentSymbol()).toThrow();
  });

  it('should throw when getting destination symbol', () => {
    expect(() => service.getDestinationSymbol()).toThrow();
  });

  it('should throw when getting origin symbol', () => {
    expect(() => service.getOriginSymbol()).toThrow();
  });

  it('should throw when getting maximum distance symbol', () => {
    expect(() => service.getMaximumDistanceSymbol()).toThrow();
  });
});
