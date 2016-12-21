'use es6';

import GoogleMapsClient from '@google/maps';

import Coordinate from '../../data/Coordinate';
import GeocodeTranslator from '../translators/GeocodeTranslator';

export default class GeocodeFetcher {
  constructor() {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: 'AIzaSyBfyXZ3kDp03V_o7_mak0wxVU4B2Zcl0Ak'
    });
  }

  getData(address) {
    return new Promise((resolve, reject) => {
         this.googleMapsClient.geocode({ address: address },
                                       (err, data) => {
             if (err !== null) {
               return reject(err);
             }

             resolve(data.json);
         });
    });
  }

  getLocations(address) {
    return this.getData(address)
               .then(response => GeocodeTranslator.translate(response));
  }
}
