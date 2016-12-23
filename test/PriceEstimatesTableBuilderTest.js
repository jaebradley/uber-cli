'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import PriceEstimate from '../src/data/PriceEstimate';
import PriceEstimates from '../src/data/PriceEstimates';
import PriceEstimatesTableBuilder from '../src/services/tables/builders/PriceEstimatesTableBuilder';
import Range from '../src/data/Range';

describe('Test Time Estimates Table Builder', function() {
  let start = new Location({
    name: 'start location name',
    coordinate: new Coordinate()
  });
  let end = new Location({
    name: 'end location name',
    coordinate: new Coordinate()
  });
  let estimates = List.of(
    new PriceEstimate({
      productName: 'jae',
      distance: 1,
      range: new Range({
        low: 2,
        high: 3
      }),
      duration: 4,
      currencyCode: 'USD',
      surgeMultiplier: 1
    }),
    new PriceEstimate({
      productName: 'bradley',
      distance: 5,
      range: new Range({
        low: 6,
        high: 7
      }),
      duration: 8,
      currencyCode: 'FOO',
      surgeMultiplier: 1.1
    }),
    new PriceEstimate({
      productName: 'baebae',
      distance: 9,
      range: new Range({
        low: 10,
        high: 11
      }),
      duration: 12,
      currencyCode: 'BAR',
      surgeMultiplier: 13
    }),
  );
  let priceEstimates = new PriceEstimates({
    start: start,
    end: end,
    estimates: estimates
  });

  it('tests table creation', function() {
    let expectedTableString = '\u001b[90m┌─────────\u001b[39m\u001b[90m┬─────────────\u001b[39m\u001b[90m┬──────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬───────────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m Service \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Price Range \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Distance \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Trip Time \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Surge         \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m jae     \u001b[90m│\u001b[39m 2-3         \u001b[90m│\u001b[39m 1        \u001b[90m│\u001b[39m 4 s       \u001b[90m│\u001b[39m NO SURGE HERE \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m bradley \u001b[90m│\u001b[39m 6-7         \u001b[90m│\u001b[39m 5        \u001b[90m│\u001b[39m 8 s       \u001b[90m│\u001b[39m 1.1x          \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────────\u001b[39m\u001b[90m┼──────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m baebae  \u001b[90m│\u001b[39m 10-11       \u001b[90m│\u001b[39m 9        \u001b[90m│\u001b[39m 12 s      \u001b[90m│\u001b[39m 13x           \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼─────────────┴──────────┴───────────┴───────────────┤\u001b[39m\n\u001b[90m│\u001b[39m Start   \u001b[90m│\u001b[39m start location name                                \u001b[90m│\u001b[39m\n\u001b[90m├─────────\u001b[39m\u001b[90m┼────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m End     \u001b[90m│\u001b[39m end location name                                  \u001b[90m│\u001b[39m\n\u001b[90m└─────────\u001b[39m\u001b[90m┴────────────────────────────────────────────────────┘\u001b[39m';
    let tableString = PriceEstimatesTableBuilder.build(priceEstimates);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.equal(expectedTableString);
  })
});
