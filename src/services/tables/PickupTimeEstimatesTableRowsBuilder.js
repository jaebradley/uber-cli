'use es6'

import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

export default class PickupTimeEstimatesTableRowsBuilder {
  constructor(durationFormatter) {
    this.durationFormatter= durationFormatter;
  }

  build(estimates) {
    let rows = Map();
    estimates.forEach((estimate) => {
      const formattedDuration = this.durationFormatter.format(estimate.duration);

      if (rows.has(formattedDuration)) {
        let productNames = rows.get(formattedDuration);
        productNames = productNames.push(estimate.productName);
        rows = rows.set(formattedDuration, productNames);
      } else {
        rows = rows.set(formattedDuration, List.of(estimate.productName));
      }
    });
    return rows.entrySeq();
  }
}
