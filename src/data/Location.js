import { Record } from 'immutable';

import Coordinate from './Coordinate';

const defaults = {
  name: '',
  coordinate: new Coordinate(),
};

export default class Location extends Record(defaults) {
}
