'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import {List} from 'immutable';

import Coordinate from '../src/data/Coordinate';
import GeocodeTranslator from '../src/services/translators/GeocodeTranslator';
import Location from '../src/data/Location';

import geocodeFile from './files/geocode';

chai.use(chaiImmutable);

let expect = chai.expect;

describe('Test Geocode Translator', function() {
  let address1 = 'jae';
  let latitude1 = 1.2;
  let longitude1 = 2.3;
  let location1 = {
    lat: latitude1,
    lng: longitude1
  };
  let geometry1 = {
    location: location1
  };
  let locationJson = {
    formatted_address: address1,
    geometry: geometry1
  };

  it('tests location translation', function() {
    let expectedLocation = new Location({
      name: address1,
      coordinate: new Coordinate({
        longitude: longitude1,
        latitude: latitude1
      })
    });
    expect(GeocodeTranslator.translateLocation(locationJson)).to.eql(expectedLocation);
  });

  it('tests location translation error cases', function() {
    let json = {};
    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(ReferenceError);
    json['formatted_address'] = undefined;

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(ReferenceError);
    json['geometry'] = {};

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(ReferenceError);
    json['geometry']['location'] = {};

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(ReferenceError);
    json['geometry']['location']['lat'] = undefined;

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(ReferenceError);
    json['geometry']['location']['lng'] = undefined;

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(TypeError);
    json['formatted_address'] = '';

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(TypeError);
    json['geometry']['location']['lng'] = 1.234;

    expect(() => GeocodeTranslator.translateLocation(json)).to.throw(TypeError);
    json['geometry']['location']['lat'] = 1.234;
  });

  it('tests full translation error cases', function() {
    let json = {};

    expect(() => GeocodeTranslator.translate(json)).to.throw(ReferenceError);
    json['status'] = 'jae';

    expect(() => GeocodeTranslator.translate(json)).to.throw(TypeError);
    json['status'] = 'OK';

    expect(() => GeocodeTranslator.translate(json)).to.throw(ReferenceError);
    json['results'] = undefined;

    expect(() => GeocodeTranslator.translate(json)).to.throw(TypeError);
  });
});
