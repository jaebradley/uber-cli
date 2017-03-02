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
    if (typeof startAddress !== 'string') {
      throw new TypeError('start address should be a string');
    }

    if (typeof endAddress !== 'string') {
      throw new TypeError('end address should be a string');
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
