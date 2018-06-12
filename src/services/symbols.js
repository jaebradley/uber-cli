const EMOJIS = Object.freeze({
  VEHICLE: '🚘',
  PRICE: '💸',
  TRIP_DISTANCE: '🔃',
  DURATION: '⏳',
  SURGE_MULTIPLIER: '💥',
  NOT_APPLICABLE: '🚫',
  SURGE_EXISTS: '😬',
  DESTINATION: '🔚',
  ORIGIN: '📍',
  MAXIMUM_DISTANCE: '💯',
});

const TEXT = Object.freeze({
  VEHICLE: 'Vehicle',
  PRICE: 'Price',
  TRIP_DISTANCE: 'Distance',
  DURATION: 'Duration',
  SURGE_MULTIPLIER: ' *',
  NOT_APPLICABLE: 'N/A',
  SURGE_EXISTS: ':-(',
  DESTINATION: 'Destination',
  ORIGIN: 'Origin',
  MAXIMUM_DISTANCE: '100',
});

const symbols = ['darwin', 'linux'].indexOf(process.platform) >= 0 ? EMOJIS : TEXT;

export default symbols;
