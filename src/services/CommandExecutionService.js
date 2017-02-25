'use es6';

import program from 'commander';

import UberService from './UberService';
import PriceEstimatesTableBuilder from './tables/builders/PriceEstimatesTableBuilder';
import TimeEstimatesTableBuilder from './tables/builders/TimeEstimatesTableBuilder';

export default class CommandExecutionService {
  constructor() {
    this.uberService = new UberService();
  }

  executePriceEstimates(start, end, distanceUnit) {
    if (typeof start !== 'string') {
      throw new TypeError('start address should be a string');
    }

    if (typeof end !== 'string') {
      throw new TypeError('end address should be a string');
    }

    return this.uberService.getPriceEstimates(start, end)
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
