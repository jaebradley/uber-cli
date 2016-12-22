'use es6';

import {List} from 'immutable';
import {UberClient} from 'uber-client';

import GeocodeService from './GeocodeService';
import PriceEstimates from '../../data/PriceEstimates';
import PriceEstimatesTranslator from './translators/PriceEstimatesTranslator';
import TimeEstimates from '../../data/TimeEstimates';
import TimeEstimatesTranslator from './translators/TimeEstimatesTranslator';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
  }

  getTimeEstimates(address) {
    return this.geocodeService.getLocations(address)
               .then(locations => UberService.getFirstLocation(locations))
               .then(location => this.client.getTimeEstimates({ start: location.coordinate }))
               .then(estimates => new TimeEstimates({
                 location: location, 
                 estimates: TimeEstimatesTranslator.translate(estimates)
               }));
  }

  getPriceEstimates(start, end) {
    let startLocation = this.geocodeService.getLocations(start)
                                           .then(locations => UberService.getFirstLocation(locations));
    let endLocation = this.geocodeService.getLocations(end)
                                         .then(locations => UberService.getFirstLocation(locations));
    return Promise.all([startLocation, endLocation])
                  .then(values => this.client.getPriceEstimates({
                    start: values[0].coordinate,
                    end: values[1].coordinate
                  }))
                  .then(response => new PriceEstimates({
                    start: values[0],
                    end: values[1],
                    estimates: PriceEstimatesTranslator.translate(response)
                  }));
  }

  static getFirstLocation(locations) {
    if (locations.isEmpty()) {
      throw new RangeError('no locations for address');
    }

    return locations.first();
  }
}
