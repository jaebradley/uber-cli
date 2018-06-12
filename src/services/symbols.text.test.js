describe('symbols', () => {
  const realProcess = global.process;
  const mockedProcess = { platform: 'foobar' };
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
    });
  });
});
