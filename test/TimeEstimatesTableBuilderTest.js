'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import Location from '../src/data/Location';
import TimeEstimate from '../src/data/TimeEstimate';
import TimeEstimates from '../src/data/TimeEstimates';
import TimeEstimatesTableBuilder from '../src/services/tables/builders/TimeEstimatesTableBuilder';

describe('Test Time Estimates Table Builder', function() {
  let location = new Location({
    name: 'jaebaebae',
    coordinate: new Coordinate()
  });
  let estimates = List.of(
    new TimeEstimate({
      productName: 'jae',
      estimateSeconds: 1
    }),
    new TimeEstimate({
      productName: 'bae',
      estimateSeconds: 1
    }),
    new TimeEstimate({
      productName: 'bradley',
      estimateSeconds: 2
    })
  );
  let timeEstimates = new TimeEstimates({
    location: location,
    estimates: estimates
  });

  it('tests table creation', function() {
    let expectedTableString = '\u001b[90m┌──────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m   📍 jaebaebae    \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┬─────────┤\u001b[39m\n\u001b[90m│\u001b[39m   ⏳    \u001b[90m│\u001b[39m    🚘    \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼─────────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 sec. \u001b[90m│\u001b[39m jae,bae \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼─────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 sec. \u001b[90m│\u001b[39m bradley \u001b[90m│\u001b[39m\n\u001b[90m└────────\u001b[39m\u001b[90m┴─────────┘\u001b[39m';
    let tableString = TimeEstimatesTableBuilder.build(timeEstimates);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.eql(expectedTableString);
  })
});
