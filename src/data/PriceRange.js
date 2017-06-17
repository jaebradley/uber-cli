import { Record } from 'immutable';

const defaults = {
  low: 0,
  high: 0,
  currencyCode: 'USD',
};

export default class PriceRange extends Record(defaults) {}
