'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = new Table();
    table.push(
      [
        {
          content: emoji.get('oncoming_automobile'),
          hAlign: 'center'
        },
        {
          content: emoji.get('money_with_wings'),
          hAlign: 'center'
        },
        {
          content: emoji.get('arrows_clockwise'),
          hAlign: 'center'
        },
        {
          content: emoji.get('hourglass_flowing_sand'),
          hAlign: 'center'
        },
        {
          content: `${emoji.get('boom')} Surge${emoji.get('boom')}`,
          hAlign: 'center'
        }
      ]
    );
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
          content: emoji.get('round_pushpin'),
          hAlign: 'center'
        },
        {
          colSpan: 4,
          content: estimates.start.name
        }
      ],
      [
        {
          colSpan: 1,
          content: emoji.get('end'),
          hAlign: 'center'
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
