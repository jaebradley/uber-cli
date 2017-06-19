import { Record } from 'immutable';

const defaults = {
  productName: '',
  estimateSeconds: 0,
};

export default class TimeEstimate extends Record(defaults) {}
