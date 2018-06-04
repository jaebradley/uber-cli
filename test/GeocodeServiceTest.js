import GeocodeService from '../src/services/GeocodeService';
import geocodeFile from './files/geocode.json';

describe('Test Geocode Service', () => {
  const service = new GeocodeService();
  const address = '25 first street cambridge ma';
  const location = {
    name: '25 First St, Cambridge, MA 02141, USA',
    coordinate: {
      latitude: 42.369695,
      longitude: -71.07800569999999,
    },
  };
  const locations = List.of(location);

  it('tests data fetching', () => service.getData(address).should.eventually.eql(geocodeFile));

  it('tests location fetching', () => service.getLocations(address).should.eventually.eql(locations));
});
