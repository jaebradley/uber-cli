import GoogleMapsClient from '@google/maps';

class GeocodeService {
  constructor() {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: 'AIzaSyBfyXZ3kDp03V_o7_mak0wxVU4B2Zcl0Ak',
    });
  }

  getData(address) {
    return new Promise((resolve, reject) => {
      this.googleMapsClient.geocode({ address }, (err, data) => {
        if (err !== null) {
          return reject(err);
        }

        return resolve(data.json);
      });
    });
  }

  async getLocations(address) {
    const { results } = await this.getData(address);
    return results.map(result => ({
      name: result.formatted_address,
      coordinate: {
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
      },
    }));
  }
}

export default GeocodeService;
