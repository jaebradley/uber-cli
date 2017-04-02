'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import PriceEstimateFormatter from './PriceEstimateFormatter';
import Utilities from '../../../Utilities';

export default class TripPriceEstimatesTableBuilder {
  constructor(rowFormatter) {
    this.rowFormatter = rowFormatter;
  }

  build(estimates, presentationDistanceUnit) {
    let table = this.buildInitialTable();
    estimates.estimates.forEach(estimate => {
      if (estimate.productName !== 'TAXI') {
        table.push(this.buildEstimateRow(estimate, presentationDistanceUnit));
      }
    });
    table.push(this.buildLocationRow(estimates.start.name, false));
    table.push(this.buildLocationRow(estimates.end.name, true));
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      emoji.get('oncoming_automobile'),
      emoji.get('money_with_wings'),
      emoji.get('arrows_clockwise'),
      emoji.get('hourglass_flowing_sand'),
      `${emoji.get('boom')} Surge${emoji.get('boom')}`
    );
  }

  buildInitialTable() {
    let table = new Table();
    let formattedHeaders = List(this.getTableHeaders().map(header => Map({
      content: header, hAlign: 'center'
    })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  buildEstimateRow(estimate, presentationDistanceUnit) {
    return [
      estimate.productName,
      this.formatRange(estimate.range),
      this.formatDistance(estimate.distance, presentationDistanceUnit),
      this.formatDuration(estimate.duration),
      this.buildSurgeMultiplierSymbol(estimate.surgeMultiplier)
    ];
  }

  buildSurgeMultiplierSymbol(surgeMultiplier) {
    return surgeMultiplier === 1
      ? emoji.get('no_entry_sign')
      : `${surgeMultiplier}x ${emoji.get('grimacing')}`;
  }

  buildLocationRow(name, isEnd) {
    let symbol = isEnd
      ? emoji.get('end')
      : emoji.get('round_pushpin');
    return [
      {
        colSpan: 1,
        content: symbol,
        hAlign: 'center'
      },
      {
        colSpan: 4,
        content: name
      }
    ]
  }
}
