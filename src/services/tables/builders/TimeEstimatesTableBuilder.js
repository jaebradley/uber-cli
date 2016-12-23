'use es6'

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class TimeEstimatesTableBuilder {
  static build(estimates) {
    let table = TimeEstimatesTableBuilder.buildInitialTable(estimates.location.name);
    TimeEstimatesTableBuilder.groupByTimeEstimate(estimates.estimates)
                             .entrySeq()
                             .forEach(e => table.push([Utilities.generateFormattedTime(e[0]), e[1].join(',')]));
    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('hourglass_flowing_sand'),
      emoji.get('oncoming_automobile')
    );
  }

  static buildInitialTable(locationName) {
    let table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emoji.get('round_pushpin')} ${locationName}`,
      hAlign: 'center'
    }]);
    let formattedHeaders = List(TimeEstimatesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static groupByTimeEstimate(estimates) {
    let timeEstimateGroups = Map();
    estimates.forEach(function(estimate) {
      if (timeEstimateGroups.has(estimate.estimateSeconds)) {
        let productNames = timeEstimateGroups.get(estimate.estimateSeconds);
        productNames = productNames.push(estimate.productName);
        timeEstimateGroups = timeEstimateGroups.set(estimate.estimateSeconds, productNames);
      } else {
        timeEstimateGroups = timeEstimateGroups.set(estimate.estimateSeconds, List.of(estimate.productName));
      }
    });
    return timeEstimateGroups;
  }
}
