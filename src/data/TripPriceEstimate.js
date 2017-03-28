'use es6';

import {Record} from 'immutable';

import Distance from './Distance';
import Duration from './Duration';
import PriceRange from './PriceRange';

let defaults = {
  productName: '',
  distance: new Distance(),
  range: new PriceRange(),
  duration: new Duration(),
  // wont show up unless > 1
  surgeMultiplier: 1
};

export default class TripPriceEstimate extends Record(defaults) {
}
