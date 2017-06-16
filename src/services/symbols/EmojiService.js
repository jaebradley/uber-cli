import emoji from 'node-emoji';


export default class EmojiService {
  constructor() {}

  getVehicleSymbol() {
    return emoji.get('oncoming_automobile');
  }

  getPriceSymbol() {
    return emoji.get('money_with_wings');
  }

  getTripDistanceSymbol() {
    return emoji.get('arrows_clockwise');
  }

  getDurationSymbol() {
    return emoji.get('hourglass_flowing_sand');
  }

  getSurgeSymbol() {
    return emoji.get('boom');
  }

  getNotApplicableSymbol() {
    return emoji.get('no_entry_sign');
  }

  getSurgePresentSymbol() {
    return emoji.get('grimacing');
  }

  getDestinationSymbol() {
    return emoji.get('end');
  }

  getOriginSymbol() {
    return emoji.get('round_pushpin');
  }

  getMaximumDistanceSymbol() {
    return emoji.get('100');
  }
}
