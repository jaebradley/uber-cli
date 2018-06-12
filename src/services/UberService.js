import UberEstimatesClient from 'uber-estimates-client';

import AddressLocator from './AddressLocator';
import TimeUnit from '../data/TimeUnit';
import DistanceUnit from '../data/DistanceUnit';

export default class UberService {
  constructor() {
    this.uberEstimatesClient = new UberEstimatesClient({ serverToken: 'We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh' });
    this.addressLocator = new AddressLocator();
  }

  async getTimeEstimates(address) {
    const location = await this.addressLocator.getFirstLocation(address);
    const timeEstimates = await this.uberEstimatesClient.getArrivalTimes({
      start: location.coordinate,
    });
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
      this.addressLocator.getFirstLocation(startAddress),
      this.addressLocator.getFirstLocation(endAddress),
    ]);
    const estimates = await this.uberEstimatesClient.getPrices({
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
