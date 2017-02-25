'use es6';

import {Enum} from 'enumify';

export default class Unit extends Enum {}
Unit.initEnum({
  MILE: {
    abbreviation: 'MI'
  },
  KILOMETER: {
    abbreviation: 'KM'
  },
  SECOND: {
  }
});
