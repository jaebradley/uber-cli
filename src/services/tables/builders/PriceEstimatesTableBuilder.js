'use es6';

import {List,Map} from 'immutable';
import Table from 'cli-table2';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = new Table({
      head: ['Service', 'Distance']
    });
  }
}
