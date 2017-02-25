'use es6';

import {Record} from 'immutable';

let defaults = {
  low: 0,
  high: 0,
  currencyCode: ''
};

export default class Range extends Record(defaults){
};
