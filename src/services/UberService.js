'use es6';

import {List} from 'immutable';
import {UberClient} from 'uber-client';

import GeocodeService from './GeocodeService';
import PriceEstimates from '../data/PriceEstimates';
import PriceEstimatesTranslator from './translators/PriceEstimatesTranslator';
import TimeEstimates from '../data/TimeEstimates';
import TripDurationEstimateTranslator from './translators/estiamtes/TripDurationEstimateTranslator';
import TripDurationEstimatesTranslator from './translators/estiamtes/TripDurationEstimatesTranslator';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
    this.tripDurationEstimatesTranslator = new TripDurationEstimatesTranslator(new TripDurationEstimateTranslator());
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
                  .then(values => {
                    return this.client
                      .getPriceEstimates({ start: values[0].coordinate,
                                           end: values[1].coordinate })
                      .then(response => new PriceEstimates({ start: values[0],
                                                             end: values[1],
                                                             estimates: PriceEstimatesTranslator.translate(response, query.distanceUnit) }));
                  });
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
