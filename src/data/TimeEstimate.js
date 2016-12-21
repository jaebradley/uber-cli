'use es6';

import {Record} from 'immutable';

let defaults = {
  productName: '',
  estimateSeconds: 0,
};

export default class TimeEstimate extends Record(defaults){
};
