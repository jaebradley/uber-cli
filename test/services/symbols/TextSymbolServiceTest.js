import chai from 'chai';

import TextSymbolService from '../../../src/services/symbols/TextSymbolService';

const expect = chai.expect;


describe('TextSymbolService Test', () => {
  const service = new TextSymbolService();

  it('should get vehicle symbol', () => {
    expect(service.getVehicleSymbol()).to.eql('Vehicle');
  });

  it('should get price symbol', () => {
    expect(service.getPriceSymbol()).to.eql('Price');
  });

  it('should get trip distance symbol', () => {
    expect(service.getTripDistanceSymbol()).to.eql('Distance');
  });

  it('should get duration symbol', () => {
    expect(service.getDurationSymbol()).to.eql('Duration');
  });

  it('should get surge symbol', () => {
    expect(service.getSurgeSymbol()).to.eql(' *');
  });

  it('should get not applicable symbol', () => {
    expect(service.getNotApplicableSymbol()).to.eql('N/A');
  });

  it('should get surge present symbol', () => {
    expect(service.getSurgePresentSymbol()).to.eql(':-(');
  });

  it('should get destination symbol', () => {
    expect(service.getDestinationSymbol()).to.eql('Destination');
  });

  it('should get origin symbol', () => {
    expect(service.getOriginSymbol()).to.eql('Origin');
  });

  it('should get maximum distance symbol', () => {
    expect(service.getMaximumDistanceSymbol()).to.eql('100');
  });
});
