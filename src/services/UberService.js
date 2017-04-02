'use es6';

import {List} from 'immutable';
import {UberClient} from 'uber-client';

import GeocodeService from './GeocodeService';
import PriceEstimates from '../data/PriceEstimates';
import TimeEstimates from '../data/TimeEstimates';
import TripDurationEstimateTranslator from './translators/estimates/TripDurationEstimateTranslator';
import TripDurationEstimatesTranslator from './translators/estimates/TripDurationEstimatesTranslator';
import TripPriceEstimateTranslator from './translators/estimates/TripPriceEstimateTranslator';
import TripPriceEstimatesTranslator from './translators/estimates/TripPriceEstimatesTranslator';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
    this.tripDurationEstimatesTranslator = new TripDurationEstimatesTranslator(new TripDurationEstimateTranslator());
    this.tripPriceEstimatesTranslator = new TripPriceEstimatesTranslator(new TripPriceEstimateTranslator());
  }

  getTimeEstimates(address) {
    return this.geocodeService.getLocations(address)
               .then(locations => UberService.getFirstLocation(locations))
               .then(location => {
                 return this.client.getTimeEstimates({ start: location.coordinate })
                                   .then(estimates => new TimeEstimates({
                                     location: location,
                                     estimates: this.tripDurationEstimatesTranslator.translate(estimates)
                                   }));
               });
  }

  getPriceEstimates(query) {
    let startLocation = this.geocodeService.getLocations(query.startAddress)
                                           .then(locations => UberService.getFirstLocation(locations));
    let endLocation = this.geocodeService.getLocations(query.endAddress)
                                         .then(locations => UberService.getFirstLocation(locations));
    return Promise.all([startLocation, endLocation])
                  .then( ([start, end]) => {
                    return this.client
                      .getPriceEstimates({ start: start.coordinate, end: end.coordinate })
                      .then(response => new PriceEstimates({
                        start: start, end: end,estimates: this.tripPriceEstimatesTranslator.translate(response)
                      }));
                  });
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
