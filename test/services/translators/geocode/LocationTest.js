'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import GeocodeLocationTranslator from '../../../../src/services/translators/geocode/Location';

const expect = chai.expect;

describe('Location Geocode Translation', function() {

  describe('JSON Validation', () => {

    describe('Valid', () => {
      const translator = new GeocodeLocationTranslator();
      const json = {
        translator.FORMATTED_ADDRESS_FIELD_NAME: 'foo',
        translator.GEOMETRY_ADDRESS_FIELD_NAME: {
          translator.LOCATION_FIELD_NAME: {
            translator.LATITUDE_FIELD_NAME: 1.234,
            translator.LONGITUDE_FIELD_NAME: 5.678
          }
        }
      };

      it('should be valid', () => {
        expect(translator.isValid(json)).to.be.true;
      });
    });

    describe('Invalid', () => {
      let json = {};
      const translator = new GeocodeLocationTranslator();

      afterEach(function() {
        expect(translator.isValid(json)).to.be.false;
      });

      it('invalid due to missing formatted address field', () => {});

      it('invalid due to missing geometry address field', () => {});

      it('invalid due to missing location field', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME] = {};
      });

      it('invalid due to missing latitude field', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME] = {};
      });

      it('invalid due to missing longitude field', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LATITUDE_FIELD_NAME] = {};
      });

      it('invalid due to invalid address type', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LONGITUDE_FIELD_NAME] = {};
      });

      it('invalid due to invalid address type', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LONGITUDE_FIELD_NAME] = {};
      });

      it('invalid due to invalid latitude type', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid longitude type', () => {
        json[translator.GEOMETRY_ADDRESS_FIELD_NAME][this.LOCATION_FIELD_NAME][this.LATITUDE_FIELD_NAME] = 1.234;
      });
    });
  });

});
