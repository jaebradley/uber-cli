import DistanceUnit from '../data/DistanceUnit';
import PriceEstimateQuery from '../data/PriceEstimateQuery';
import UberService from './UberService';
import DistanceConverter from './DistanceConverter';
import DurationConverter from './DurationConverter';
import DurationFormatter from './DurationFormatter';
import TripPriceEstimateRowFormatter from './tables/TripPriceEstimateRowFormatter';
import TripPriceEstimatesTableBuilder from './tables/builders/TripPriceEstimatesTableBuilder';
import PickupTimeEstimatesTableRowsBuilder from './tables/PickupTimeEstimatesTableRowsBuilder';
import PickupTimeEstimatesTableBuilder from './tables/builders/PickupTimeEstimatesTableBuilder';
import SymbolService from './symbols/SymbolService';

export default class CommandExecutionService {
  constructor() {
    this.uberService = new UberService();
    this.distanceConverter = new DistanceConverter();
    this.durationConverter = new DurationConverter();
    this.symbolService = new SymbolService();
    this.durationFormatter = new DurationFormatter(this.durationConverter);
    this.tripPriceEstimateRowFormatter = new TripPriceEstimateRowFormatter(this.distanceConverter, this.durationFormatter, this.symbolService); // eslint-disable-line max-len
    this.tripPriceEstimatesTableBuilder = new TripPriceEstimatesTableBuilder(this.tripPriceEstimateRowFormatter, this.symbolService); // eslint-disable-line max-len
    this.pickupTimeEstimatesTableRowsBuilder = new PickupTimeEstimatesTableRowsBuilder(this.durationFormatter, this.symbolService); // eslint-disable-line max-len
    this.pickupTimeEstimatesTableBuilder = new PickupTimeEstimatesTableBuilder(this.pickupTimeEstimatesTableRowsBuilder, this.symbolService); // eslint-disable-line max-len
  }

  executePriceEstimates(startAddress, endAddress, distanceUnitName) {
    if (typeof startAddress !== 'string') {
      throw new TypeError('start address should be a string');
    }

    if (typeof endAddress !== 'string') {
      throw new TypeError('end address should be a string');
    }

    let distanceUnit = DistanceUnit.MILE;
    if (typeof distanceUnitName === 'string') {
      distanceUnit = DistanceUnit.enumValueOf(distanceUnitName.toUpperCase());
    }

    if (typeof distanceUnit === 'undefined') {
      throw new TypeError(`Unknown distance unit: ${distanceUnitName}`);
    }

    const query = new PriceEstimateQuery({
      startAddress,
      endAddress,
    });

    return this.uberService.getPriceEstimates(query)
      .then(estimates => this.tripPriceEstimatesTableBuilder.build(estimates, distanceUnit));
  }

  executeTimeEstimates(address) {
    if (typeof address !== 'string') {
      throw new TypeError('address should be a string');
    }

    return this.uberService.getTimeEstimates(address)
      .then(estimates => this.pickupTimeEstimatesTableBuilder.build(estimates));
  }
}
