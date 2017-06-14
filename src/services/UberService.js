'use es6';

import { List } from 'immutable';
import { UberClient } from 'uber-client';

import GeocodeService from './GeocodeService';
import PriceEstimates from '../data/PriceEstimates';
import TimeEstimates from '../data/TimeEstimates';
import PickupTimeEstimateTranslator from './translators/estimates/PickupTimeEstimateTranslator';
import PickupTimeEstimatesTranslator from './translators/estimates/PickupTimeEstimatesTranslator';
import TripPriceEstimateTranslator from './translators/estimates/TripPriceEstimateTranslator';
import TripPriceEstimatesTranslator from './translators/estimates/TripPriceEstimatesTranslator';
import DistanceExceeds100MilesError from '../errors/DistanceExceeds100MilesError';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
    this.pickupTimeEstimatesTranslator = new PickupTimeEstimatesTranslator(new PickupTimeEstimateTranslator());
    this.tripPriceEstimatesTranslator = new TripPriceEstimatesTranslator(new TripPriceEstimateTranslator());
  }

  getFirstLocation(address) {
    return this.geocodeService.getLocations(address)
               .then(locations => {
                 if (locations.isEmpty()) {
                   throw new RangeError(`no locations for address: ${address}`);
                 }

                 return locations.first();
               });
  }

  getTimeEstimates(address) {
    return this.getFirstLocation(address)
               .then(location => {
                 return this.client.getTimeEstimates({ start: location.coordinate })
                                   .then(estimates => new TimeEstimates({
                                     location: location,
                                     estimates: this.pickupTimeEstimatesTranslator.translate(estimates)
                                   }));
               });
  }

  getPriceEstimates(query) {
    let startLocation = this.getFirstLocation(query.startAddress);
    let endLocation = this.getFirstLocation(query.endAddress);
    return Promise.all([ startLocation, endLocation ])
                  .then( ([ start, end ]) => {
                    return this.client
                      .getPriceEstimates({ start: start.coordinate, end: end.coordinate })
                      .then(response => new PriceEstimates({
                        start: start,
                        end: end,
                        estimates: this.tripPriceEstimatesTranslator.translate(response)
                      })).catch((e) => {
                        console.log(e);
                        if (e.message == 'StatusCodeError: 422 - {"fields":{"start_longitude":"Distance between two points exceeds 100 miles","end_longitude":"Distance between two points exceeds 100 miles","start_latitude":"Distance between two points exceeds 100 miles","end_latitude":"Distance between two points exceeds 100 miles"},"message":"Distance between two points exceeds 100 miles","code":"distance_exceeded"}') {
                          throw new DistanceExceeds100MilesError(`Distance between ${query.startAddress} and ${query.endAddress} exceeds 100 miles`);
                        }

                        throw e;
                      });
                  });
  }
}
