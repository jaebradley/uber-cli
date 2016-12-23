'use es6';

import {List,Map} from 'immutable';
import Table from 'cli-table2';

import Utilities from '../../../Utilities';

export default class PriceEstimatesTableBuilder {
  static build(estimates) {
    let table = new Table({
      head: ['Service', 'Price Range', 'Distance', 'Trip Time', 'Surge']
    });
    estimates.estimates.forEach(function(estimate) {
      let surge = estimate.surgeMultiplier == 1
        ? 'NO SURGE HERE'
        : `${estimate.surgeMultiplier}x`;
      table.push(
        [
          estimate.productName,
          estimate.getFormattedRange(),
          estimate.distance,
          Utilities.generateFormattedTime(estimate.duration),
          surge
        ]
      );
    });
    table.push(
      [
        {
          colSpan: 1,
          content: 'Start'
        },
        {
          colSpan: 4,
          content: estimates.start.name
        }
      ],
      [
        {
          colSpan: 1,
          content: 'End'
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
