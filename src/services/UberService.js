'use es6';

import {List} from 'immutable';

import {UberClient} from 'uber-client';

export default class UberService {
  constructor() {
    this.client = new UberClient('We0MNCaIpx00F_TUopt4jgL9BzW3bWWt16aYM4mh');
    this.geocodeService = new GeocodeService();
  }

  getTimeEstimates(address) {
    return this.geocodeService.getLocations(address)
                              .then(locations => {
                                if (locations.isEmpty()) {
                                  throw new RangeError('no locations for address');
                                }

                                return locations.first();
                              })
                              .then(location => {
                                return this.client.getTimeEstimates({
                                  start: location.coordinate
                                });
                              })
                              .then(estimates => {

                              });
  }
}
