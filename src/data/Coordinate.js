import { Record } from 'immutable';

const defaults = {
  latitude: 0,
  longitude: 0,
};

export default class Coordinate extends Record(defaults) {
}
