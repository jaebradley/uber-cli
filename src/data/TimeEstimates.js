import { List, Record } from 'immutable';

const defaults = {
  location: {
    name: '',
    coordinate: {
      latitude: 0,
      longitude: 0,
    },
  },
  estimates: List(),
};

export default class TimeEstimates extends Record(defaults) {}
