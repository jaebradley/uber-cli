'use es6';

import program from 'commander';

import DistanceUnit from '../data/DistanceUnit';
import PriceEstimateQuery from '../data/PriceEstimateQuery';
import UberService from './UberService';
import PriceEstimatesTableBuilder from './tables/builders/PriceEstimatesTableBuilder';
import TimeEstimatesTableBuilder from './tables/builders/TimeEstimatesTableBuilder';

export default class CommandExecutionService {
  constructor() {
    this.uberService = new UberService();
  }

  executePriceEstimates(startAddress, endAddress, distanceUnitName) {
    // commander.js doesn't support required arguments, and will always
    // interpolate arguments into strings.
    if (typeof startAddress !== 'string' || typeof endAddress !== 'string') {
      throw new TypeError(
        'Start and End addresses (-s \'<address>\' -e \'<address>\') are required.'
      );
    }

    const query = PriceEstimateQuery.from(startAddress, endAddress, distanceUnitName);
    return this.uberService.getPriceEstimates(query)
                           .then(estimates => PriceEstimatesTableBuilder.build(estimates));
  }

  executeTimeEstimates(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.uberService.getTimeEstimates(address)
                           .then(estimates => TimeEstimatesTableBuilder.build(estimates));
  }
}
