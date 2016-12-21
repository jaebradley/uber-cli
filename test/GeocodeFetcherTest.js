'use es6';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import GeocodeFetcher from '../src/services/fetchers/GeocodeFetcher';
import Location from '../src/data/Location';

import geocodeFile from './files/geocode';

chai.use(chaiAsPromised);
chai.use(chaiImmutable);
chai.should();

describe('Test Geocode Fetcher', function() {
  let geocodeFetcher = new GeocodeFetcher();
  let address = '25 first street cambridge ma';
  let location = new Location({
    name: '25 First St, Cambridge, MA 02141, USA',
    coordinate: new Coordinate({
      latitude: 42.369695,
      longitude: -71.07800569999999
    })
  });
  let locations = List.of(location);
  it('tests data fetching', function() {
    return geocodeFetcher.getData(address).should.eventually.eql(geocodeFile);
  });

  it('tests location fetching', function() {
    return geocodeFetcher.getLocations(address).should.eventually.eql(locations);
  });
});
