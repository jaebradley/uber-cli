import { UberClient } from 'uber-client';

import GeocodeService from './GeocodeService';
import TripPriceEstimateTranslator from './translators/estimates/TripPriceEstimateTranslator';
import translateTripPriceEstimate from './translators/estimates/translateTripPriceEstimate';
import translatePickupTimeEstimate from './translators/estimates/translatePickupTimeEstimate';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
  }

  getFirstLocation(address) {
    return this.geocodeService.getLocations(address)
      .then((locations) => {
        if (locations.isEmpty()) {
          throw new RangeError(`no locations for address: ${address}`);
        }

        return locations.first();
      });
  }

  getTimeEstimates(address) {
    return this.getFirstLocation(address)
      .then(location => this.client.getTimeEstimates({ start: location.coordinate })
        .then(estimates => ({
          location,
          estimates: estimates.times.map(estimate => translatePickupTimeEstimate(estimate)),
        })));
  }

  getPriceEstimates(query) {
    const startLocation = this.getFirstLocation(query.startAddress);
    const endLocation = this.getFirstLocation(query.endAddress);
    return Promise.all([startLocation, endLocation])
      .then(([start, end]) =>
        this.client
          .getPriceEstimates({ start: start.coordinate, end: end.coordinate })
          .then(response => ({
            start,
            end,
            estimates: response.prices.map(estimate => translateTripPriceEstimate(estimate)),
          })));
  }
}
