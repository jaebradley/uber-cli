import { UberClient } from 'uber-client';

import GeocodeService from './GeocodeService';
import translateTripPriceEstimate from './translators/estimates/translateTripPriceEstimate';
import translatePickupTimeEstimate from './translators/estimates/translatePickupTimeEstimate';

export default class UberService {
  constructor() {
    this.uberClient = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
  }

  async getFirstLocation(address) {
    const locations = await this.geocodeService.getLocations(address);
    if (locations.length > 0) {
      return locations[0];
    }

    throw new RangeError(`No locations for address: ${address}`);
  }

  async getTimeEstimates(address) {
    const location = await this.getFirstLocation(address);
    const timeEstimates = await this.uberClient.getTimeEstimates({ start: location.coordinate });
    return {
      location,
      estimates: timeEstimates.times.map(estimate => translatePickupTimeEstimate(estimate)),
    };
  }

  async getPriceEstimates({ startAddress, endAddress }) {
    const [ start, end ] = await Promise.all([this.getFirstLocation(startAddress), this.getFirstLocation(endAddress)]);
    const estimates = await this.uberClient.getPriceEstimates({ start: start.coordinate, end: end.coordinate });
    return {
      start,
      end,
      estimates: estimates.prices.map(estimate => translateTripPriceEstimate(estimate)),
    };
  }
}
