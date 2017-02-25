'use es6';

import {Enum} from 'enumify';

export default class Units extends Enum {}
Units.initEnum({
  MILE: {
    abbreviation: 'MI'
  },
  KILOMETER: {
    abbreviation: 'KM'
  }
});
