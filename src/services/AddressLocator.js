import GoogleMapsClient from '@google/maps';

class AddressLocator {
  constructor(apiKey) {
    this.googleMapsClient = GoogleMapsClient.createClient({
      key: apiKey,
      Promise,
    });
  }

  async getFirstLocation(address) {
    const { json } = await this.googleMapsClient.geocode({ address }).asPromise();
    const { results: locations } = json;

    if (locations.length > 0) {
      const location = locations[0];
      return {
        name: location.formatted_address,
        coordinate: {
          latitude: location.geometry.location.lat,
          longitude: location.geometry.location.lng,
        },
      };
    }

    throw new RangeError(`No locations for address: ${address}`);
  }
}

export default AddressLocator;
