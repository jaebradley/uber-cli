'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import PriceEstimateFormatter from './PriceEstimateFormatter';
import Utilities from '../../../Utilities';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = PriceEstimatesTableBuilder.buildInitialTable();
    estimates.estimates.forEach(estimate => {
      if (estimate.productName !== 'TAXI') {
        table.push(PriceEstimatesTableBuilder.buildEstimateRow(estimate));
      }
    });
    table.push(PriceEstimatesTableBuilder.buildLocationRow(estimates.start.name, false));
    table.push(PriceEstimatesTableBuilder.buildLocationRow(estimates.end.name, true));
    return table.toString();
  }

  static getTableHeaders() {
    return List.of(
      emoji.get('oncoming_automobile'),
      emoji.get('money_with_wings'),
      emoji.get('arrows_clockwise'),
      emoji.get('hourglass_flowing_sand'),
      `${emoji.get('boom')} Surge${emoji.get('boom')}`
    );
  }

  static buildInitialTable() {
    let table = new Table();
    let formattedHeaders = List(PriceEstimatesTableBuilder.getTableHeaders()
                              .map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  static buildEstimateRow(estimate) {
    return [
      estimate.productName,
      PriceEstimateFormatter.formatRange(estimate.range),
      PriceEstimateFormatter.formatDistance(estimate.distance),
      Utilities.generateFormattedTime(estimate.duration),
      PriceEstimatesTableBuilder.buildSurgeMultiplierSymbol(estimate.surgeMultiplier)
    ];
  }

  static buildSurgeMultiplierSymbol(surgeMultiplier) {
    return surgeMultiplier === 1
      ? emoji.get('no_entry_sign')
      : `${surgeMultiplier}x ${emoji.get('grimacing')}`;
  }

  static buildLocationRow(name, isEnd) {
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
