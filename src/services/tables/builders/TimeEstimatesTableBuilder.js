'use es6'

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

var emojiETA = emoji.get('hourglass_flowing_sand');
var emojiCarType = emoji.get('oncoming_automobile');
var emojiLocation = emoji.get('round_pushpin');
var emojiSupportedOSList = ['darwin'];

export default class TimeEstimatesTableBuilder {
  static build(estimates) {
    if(emojiSupportedOSList.indexOf(process.platform)<0) {
      emojiETA = 'ETA ';
      emojiCarType = 'Car Type ';
      emojiLocation = 'Location : ';
    }

    let table = TimeEstimatesTableBuilder.buildInitialTable(estimates.location.name);
    TimeEstimatesTableBuilder.groupByTimeEstimate(estimates.estimates)
                             .entrySeq()
                             .forEach(e => table.push([Utilities.generateFormattedTime(e[0]), e[1].join(',')]));
    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emojiETA,
      emojiCarType
    );
  }

  static buildInitialTable(locationName) {
    let table = new Table();
    table.push([{
      colSpan: 2,
      content: `${emojiLocation} ${locationName}`,
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

