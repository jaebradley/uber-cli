'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = new Table({
      head: [
        emoji.get('oncoming_automobile'),
        emoji.get('money_with_wings'),
        emoji.get('arrows_clockwise'),
        emoji.get('hourglass_flowing_sand'),
        `${emoji.get('boom')} Surge${emoji.get('boom')}`
      ]
    });
    estimates.estimates.forEach(function(estimate) {
      if (estimate.productName !== 'TAXI') {
        let surge = estimate.surgeMultiplier == 1
          ? emoji.get('no_entry_sign')
          : `${estimate.surgeMultiplier}x ${emoji.get('grimacing')}`;
        table.push(
          [
            estimate.productName,
            estimate.getFormattedRange(),
            estimate.getFormattedDistance(),
            Utilities.generateFormattedTime(estimate.duration),
            surge
          ]
        );
      }
    });
    table.push(
      [
        {
          colSpan: 1,
          content: emoji.get('round_pushpin')
        },
        {
          colSpan: 4,
          content: estimates.start.name
        }
      ],
      [
        {
          colSpan: 1,
          content: emoji.get('end')
        },
        {
          colSpan: 4,
          content: estimates.end.name
        }
      ]
    );
    return table.toString();
  }
}
