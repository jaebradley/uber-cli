'use es6';

import {expect} from 'chai';

import GeocodeFetcher from '../src/services/GeocodeFetcher';

describe('Test Geocode Fetcher', function() {
  let address = '25 first street cambridge ma';
  let geocodeFetcher = new GeocodeFetcher();
  it('tests geocode fetching', function() {
    return geocodeFetcher.getData(address)
                         .then(result => console.log(JSON.stringify(result)));
  });
});
