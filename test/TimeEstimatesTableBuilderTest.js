'use es6';

import {expect} from 'chai';

import {List, Map} from 'immutable';

import TimeEstimate from '../src/data/TimeEstimate';
import TimeEstimatesTableBuilder from '../src/services/tables/builders/TimeEstimatesTableBuilder';

describe('Test Time Estimates Table Builder', function() {
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

  it('tests table creation', function() {
    expect(TimeEstimatesTableBuilder.build(estimates)).to.equal('\u001b[90m┌────────────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m\u001b[31m Estimated Wait \u001b[39m\u001b[90m│\u001b[39m\u001b[31m Services \u001b[39m\u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 s            \u001b[90m│\u001b[39m jae,bae  \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 s            \u001b[90m│\u001b[39m bradley  \u001b[90m│\u001b[39m\n\u001b[90m└────────────────\u001b[39m\u001b[90m┴──────────┘\u001b[39m');
  })
});
