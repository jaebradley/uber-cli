import BaseSymbolService from './BaseSymbolService';
import EmojiService from './EmojiService';
import TextSymbolService from './TextSymbolService';

export default class SymbolService extends BaseSymbolService {
  constructor() {
    super();
    this.client = SymbolService.areEmojisSupported() ?
                    new EmojiService() :
                    new TextSymbolService();
  }

  static areEmojisSupported() {
    return SymbolService.getEmojiSupportedOperatingSystems().contains(process.platform);
  }

  static getEmojiSupportedOperatingSystems() {
    return ['darwin'];
  }

  getVehicleSymbol() {
    return this.client.getVehicleSymbol();
  }

  getPriceSymbol() {
    return this.client.getPriceSymbol();
  }

  getTripDistanceSymbol() {
    return this.client.getTripDistanceSymbol();
  }

  getDurationSymbol() {
    return this.client.getDurationSymbol();
  }

  getSurgeSymbol() {
    return this.client.getSurgeSymbol();
  }

  getNotApplicableSymbol() {
    return this.client.getNotApplicableSymbol();
  }

  getSurgePresentSymbol() {
    return this.client.getSurgePresentSymbol();
  }

  getDestinationSymbol() {
    return this.client.getDestinationSymbol();
  }

  getOriginSymbol() {
    return this.client.getOriginSymbol();
  }

  getMaximumDistanceSymbol() {
    return this.client.getMaximumDistanceSymbol();
  }
}
