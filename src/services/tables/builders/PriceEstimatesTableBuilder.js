'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = PriceEstimatesTableBuilder.buildInitialTable();
    estimates.estimates.forEach(estimate => table.push(PriceEstimatesTableBuilder.buildEstimateRow(estimate)));
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
    PriceEstimatesTableBuilder.getTableHeaders()
                              .forEach(header => table.push({
                                content: header,
                                hAlign: 'center'
                              }));
    return table;
  }

  static buildEstimateRow(estimate) {
    if (estimate.productName !== 'TAXI') {
      return [
        estimate.productName,
        estimate.getFormattedRange(),
        estimate.getFormattedDistance(),
        Utilities.generateFormattedTime(estimate.duration),
        PriceEstimatesTableBuilder.buildSurgeMultiplierSymbol(estimate.surgeMultiplier)
      ];
    }
  }

  static buildSurgeMultiplierSymbol(surgeMultiplier) {
    if (surgeMultiplier === 1) {
      return emoji.get('no_entry_sign');
    }

    return `${estimate.surgeMultiplier}x ${emoji.get('grimacing')}`;
  }

  static buildLocationRow(name, isEnd) {
    let symbol = emoji.get('round_pushpin');
    if (isEnd) {
      symbol = emoji.get('end');
    }
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
