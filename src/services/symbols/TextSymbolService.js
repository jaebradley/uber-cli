import BaseSymbolService from './BaseSymbolService';

export default class TextSymbolService extends BaseSymbolService {
  getVehicleSymbol() {
    return 'Vehicle';
  }

  getPriceSymbol() {
    return 'Price';
  }

  getTripDistanceSymbol() {
    return 'Distance';
  }

  getDurationSymbol() {
    return 'Duration';
  }

  getSurgeSymbol() {
    return ' *';
  }

  getNotApplicableSymbol() {
    return 'N/A';
  }

  getSurgePresentSymbol() {
    return ':-(';
  }

  getDestinationSymbol() {
    return 'Destination';
  }

  getOriginSymbol() {
    return 'Origin';
  }

  getMaximumDistanceSymbol() {
    return '100';
  }
}
