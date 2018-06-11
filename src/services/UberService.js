import { UberClient } from 'uber-client';

import GeocodeService from './GeocodeService';
import TimeUnit from '../data/TimeUnit';
import DistanceUnit from '../data/DistanceUnit';

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
      estimates: timeEstimates.times.map(estimate => ({
        productName: estimate.localized_display_name,
        estimatedDuration: {
          length: estimate.estimate,
          unit: TimeUnit.SECOND,
        },
      })),
    };
  }

  async getPriceEstimates({ startAddress, endAddress }) {
    const [start, end] = await Promise.all([
      this.getFirstLocation(startAddress),
      this.getFirstLocation(endAddress),
    ]);
    const estimates = await this.uberClient.getPriceEstimates({
      start: start.coordinate,
      end: end.coordinate,
    });

    return {
      start,
      end,
      estimates: estimates.prices.map(estimate => ({
        productName: estimate.localized_display_name,
        distance: {
          value: estimate.distance,
          unit: DistanceUnit.MILE,
        },
        duration: {
          length: estimate.duration,
          unit: TimeUnit.SECOND,
        },
        range: {
          high: estimate.high_estimate,
          low: estimate.low_estimate,
          currencyCode: estimate.currency_code,
        },
        surgeMultiplier: estimate.surgeMultiplier ? estimate.surgeMultiplier : null,
      })),
    };
  }
}
