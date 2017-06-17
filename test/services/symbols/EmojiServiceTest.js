import chai from 'chai';
import emoji from 'node-emoji';

import EmojiService from '../../../src/services/symbols/EmojiService';

const expect = chai.expect;


describe('EmojiService Test', () => {
  const service = new EmojiService();

  it('should get vehicle symbol', () => {
    expect(service.getVehicleSymbol()).to.eql(emoji.get('oncoming_automobile'));
  });

  it('should get price symbol', () => {
    expect(service.getPriceSymbol()).to.eql(emoji.get('money_with_wings'));
  });

  it('should get trip distance symbol', () => {
    expect(service.getTripDistanceSymbol()).to.eql(emoji.get('arrows_clockwise'));
  });

  it('should get duration symbol', () => {
    expect(service.getDurationSymbol()).to.eql(emoji.get('hourglass_flowing_sand'));
  });

  it('should get surge symbol', () => {
    expect(service.getSurgeSymbol()).to.eql(emoji.get('boom'));
  });

  it('should get not applicable symbol', () => {
    expect(service.getNotApplicableSymbol()).to.eql(emoji.get('no_entry_sign'));
  });

  it('should get surge present symbol', () => {
    expect(service.getSurgePresentSymbol()).to.eql(emoji.get('grimacing'));
  });

  it('should get destination symbol', () => {
    expect(service.getDestinationSymbol()).to.eql(emoji.get('end'));
  });

  it('should get origin symbol', () => {
    expect(service.getOriginSymbol()).to.eql(emoji.get('round_pushpin'));
  });

  it('should get maximum distance symbol', () => {
    expect(service.getMaximumDistanceSymbol()).to.eql(emoji.get('100'));
  });
});
