'use es6';

import emoji from 'node-emoji';
import {List,Map} from 'immutable';
import Table from 'cli-table2';

import PriceEstimateFormatter from './PriceEstimateFormatter';
import Utilities from '../../../Utilities';

var emojiCarType = emoji.get('oncoming_automobile');
var emojiPrice = emoji.get('money_with_wings');
var emojiDistance = emoji.get('arrows_clockwise');
var emojiETA = emoji.get('hourglass_flowing_sand');
var emojiBoom = emoji.get('boom');
var emojiNo = emoji.get('no_entry_sign');
var emojiSurgePresent = emoji.get('grimacing');
var emojiDestination = emoji.get('end');
var emojiStartLocation = emoji.get('round_pushpin');
var emojiSupportedOSList = ['darwin'];



export default class PriceEstimatesTableBuilder {
  static build(estimates) {
     if(emojiSupportedOSList.indexOf(process.platform)<0) {
      emojiCarType = 'Car Type ';
      emojiPrice = 'Price ';
      emojiDistance = 'Distance ';
      emojiETA = 'ETA ';
      emojiBoom = '*';
      emojiNo = 'No ';
      emojiSurgePresent = 'Yes';
      emojiDestination = 'Destination ';
      emojiStartLocation = 'Start Location ';
    }

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
      emojiCarType,
      emojiPrice,
      emojiDistance,
      emojiETA,
      `${emojiBoom} Surge${emojiBoom}`
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
      PriceEstimateFormatter.formatDuration(estimate.duration),
      PriceEstimatesTableBuilder.buildSurgeMultiplierSymbol(estimate.surgeMultiplier)
    ];
  }

  static buildSurgeMultiplierSymbol(surgeMultiplier) {
    return surgeMultiplier === 1
      ? emojiNo
      : `${surgeMultiplier}x ${emojiCarType}`;
  }

  static buildLocationRow(name, isEnd) {
    let symbol = isEnd
      ? emojiDestination
      : emojiStartLocation;
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

