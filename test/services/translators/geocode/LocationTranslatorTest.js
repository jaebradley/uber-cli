'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { List } from 'immutable';

import Coordinate from '../../../../src/data/Coordinate';
import Location from '../../../../src/data/Location';

import LocationTranslator from '../../../../src/services/translators/geocode/LocationTranslator';

const expect = chai.expect;

describe('Location Translation', function() {
  const translator = new LocationTranslator();
  let location = {};
  location[translator.LATITUDE_FIELD_NAME] = 1.234;
  location[translator.LONGITUDE_FIELD_NAME] = 5.678;

  let address = {};
  address[translator.LOCATION_FIELD_NAME] = location;

  let json = {};
  json[translator.FORMATTED_ADDRESS_FIELD_NAME] = 'foo';
  json[translator.GEOMETRY_ADDRESS_FIELD_NAME] = address;

  describe('JSON Validation', () => {

    describe('Valid', () => {
      it('should be valid', () => {
        expect(translator.isValid(json)).to.be.true;
      });
    });

    describe('Invalid', () => {
      let test = {};

      afterEach(function() {
        expect(translator.isValid(test)).to.be.false;
      });

      it('invalid due to missing formatted address field', () => {});

      it('invalid due to missing geometry address field', () => {
        test[translator.FORMATTED_ADDRESS_FIELD_NAME] = {};
      });

      it('invalid due to missing location field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME] = {};
      });

      it('invalid due to missing latitude field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME] = {};
      });

      it('invalid due to missing longitude field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LATITUDE_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid address type', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LONGITUDE_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid latitude type', () => {
        test[translator.FORMATTED_ADDRESS_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid longitude type', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LATITUDE_FIELD_NAME] = 1.234;
      });
    });
  });

  describe('Invalid', () => {

    it('throws for invalid json', () => {
      const isValid = sinon.stub(translator, 'isValid').returns(false);
      expect(() => translator.translate({})).to.throw(Error);
      isValid.restore();
    });

    it('translates valid json', () => {
      const expected = new Location({
        name: 'foo',
        coordinate: new Coordinate({
          latitude: 1.234,
          longitude: 5.678
        })
      });
      const isValid = sinon.stub(translator, 'isValid').returns(true);
      expect(translator.translate(json)).to.eql(expected);
      isValid.restore();
    });
  });
});
