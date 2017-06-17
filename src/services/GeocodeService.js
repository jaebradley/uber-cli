import GoogleMapsClient from '@google/maps';

import LocationTranslator from './translators/geocode/LocationTranslator';
import LocationsTranslator from './translators/geocode/LocationsTranslator';

export default class GeocodeService {
  constructor() {
    this.translator = new LocationsTranslator(new LocationTranslator());
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: 'AIzaSyBfyXZ3kDp03V_o7_mak0wxVU4B2Zcl0Ak',
    });
  }

  getData(address) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.geocode({ ...address },
        (err, data) => {
          if (err !== null) {
            return reject(err);
          }

          return resolve(data.json);
        });
    });
  }

  getLocations(address) {
    return this.getData(address).then(response => this.translator.translate(response));
  }
}
