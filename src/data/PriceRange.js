'use es6';

import {Record} from 'immutable';

let defaults = {
  low: 0,
  high: 0,
  currencyCode: 'USD'
};

export default class PriceRange extends Record(defaults){
};
