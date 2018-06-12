describe('symbols', () => {
  const realProcess = global.process;
  const mockedProcess = { platform: 'darwin' };
  let symbols;

  beforeEach(() => {
    global.process = mockedProcess;
    // eslint-disable-next-line
    symbols = require('./symbols');
  });

  afterEach(() => {
    global.process = realProcess;
  });

  describe('text', () => {
    it('gets text', () => {
      expect(symbols.default).toEqual({
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
    });
  });
});
