'use es6'

import Table from 'cli-table2';
import { List, Map } from 'immutable';

export default class PickupTimeEstimatesTableRowsBuilder {
  constructor(durationFormatter) {
    this.durationFormatter = durationFormatter;
  }

  build(estimates) {
    const estimatesGroupedByTime = this.groupByTime(estimates);
    return List(estimatesGroupedByTime.entrySeq().map((entry) => {
      return List.of(entry[0], entry[1].join(', '));
    }));
  }

  groupByTime(estimates){
    let rows = Map();
    estimates.forEach((estimate) => {
      const formattedDuration = this.durationFormatter.format(estimate.estimatedDuration);

      if (rows.has(formattedDuration)) {
        let productNames = rows.get(formattedDuration);
        productNames.push(estimate.productName);
        rows = rows.set(formattedDuration, productNames);
      } else {
        rows = rows.set(formattedDuration, [estimate.productName]);
      }
    });
    return rows;
  }
}
