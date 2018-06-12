const getArrivalTimes = jest.fn(() => ({
  times: [
    {
      localized_display_name: 'first localized display name',
      estimate: 'first estimate',
    },
    {
      localized_display_name: 'second localized display name',
      estimate: 'second estimate',
    },
  ],
}));

const getPrices = jest.fn(() => ({
  prices: [
    {
      localized_display_name: 'first localized display name',
      distance: 'first distance',
      duration: 'first duration',
      high_estimate: 'first high estimate',
      low_estimate: 'first low estimate',
      currency_code: 'first currency code',
      surgeMultiplier: undefined,
    },
    {
      localized_display_name: 'second localized display name',
      distance: 'second distance',
      duration: 'second duration',
      high_estimate: 'second high estimate',
      low_estimate: 'second low estimate',
      currency_code: 'second currency code',
      surgeMultiplier: 'surgeMultiplier',
    },
  ],
}));

const constructor = jest.fn(() => ({
  getArrivalTimes,
  getPrices,
}));

const UberEstimatesClient = constructor;

export default UberEstimatesClient;
export {
  getArrivalTimes,
  getPrices,
};
