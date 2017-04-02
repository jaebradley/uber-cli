'use es6'

import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

import Utilities from '../../../Utilities';

export default class PickupTimeEstimatesTableBuilder {
  build(estimates) {
    let table = TimeEstimatesTableBuilder.buildInitialTable(estimates.location.name);
    TimeEstimatesTableBuilder.groupByTimeEstimate(estimates.estimates)
                             .entrySeq()
                             .forEach(e => table.push([Utilities.generateFormattedTime(e[0]), e[1].join(',')]));
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      emoji.get('hourglass_flowing_sand'),
      emoji.get('oncoming_automobile')
    );
  }

  getFormattedLocation(locationName) {
    return List.of(
      Map({
        colSpan: 2,
        content: `${emoji.get('round_pushpin')} ${locationName}`,
        hAlign: 'center'
      })
    );
  }

  buildInitialTable(locationName) {
    let table = new Table();
    table.push(this.getFormattedLocation(locationName).toJS());
    let formattedHeaders = List(TimeEstimatesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  groupByTimeEstimate(estimates) {
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
