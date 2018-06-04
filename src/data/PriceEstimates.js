import { List, Record } from 'immutable';

const defaults = {
  start: {
    name: '',
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
  },
  end: {
    name: '',
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
  },
  estimates: List(),
};

export default class PriceEstimates extends Record(defaults) {}
