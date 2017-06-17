import { Record } from 'immutable';

const defaults = {
  startAddress: '',
  endAddress: '',
};

export default class PriceEstimateQuery extends Record(defaults) {}
