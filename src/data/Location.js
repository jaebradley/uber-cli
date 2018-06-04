import { Record } from 'immutable';

const defaults = {
  name: '',
  coordinate: {
    latitude: 0,
    longitude: 0,
  },
};

export default class Location extends Record(defaults) {
}
