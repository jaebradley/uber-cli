'use es6'

import {List,Map} from 'immutable';

export default class TimeEstimatesTableBuilder {
  static build(estimates) {
    let table = new Table({
      head: ['Estimated Wait (Min,)', 'Services']
    });
    let timeEstimateGroups = groupByTimeEstimate(estimates);
    timeEstimateGroups.entrySeq().forEach(e => table.push([e[0], e[1].join(',')]));
    return table.toString();
  }

  static groupByTimeEstimate(estimates) {
    let timeEstimateGroups = Map();
    estimates.forEach(function(estimate) {
      if (timeEstimateGroups.has(estimate.estimateSeconds)) {
        let productNames = timeEstimateGroups.get(estimate.estimateSeconds);
        productNames = productNames.push(estimate.productName);
        timeEstimateGroups = timeEstimateGroups.set(estimate.estimateSeconds, productNames);
      }
    });
    return timeEstimateGroups;
  }
}
