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
    let expectedTableString = '┌───────────────────────────┐\n│         jaebaebae         │\n├────────────────┬──────────┤\n│ Estimated Wait │ Services │\n├────────────────┼──────────┤\n│ 1 s            │ jae,bae  │\n├────────────────┼──────────┤\n│ 2 s            │ bradley  │\n└────────────────┴──────────┘';
    let tableString = TimeEstimatesTableBuilder.build(timeEstimates);
    console.log(expectedTableString);
    console.log(tableString);
    expect(tableString).to.equal(expectedTableString);
  })
});
