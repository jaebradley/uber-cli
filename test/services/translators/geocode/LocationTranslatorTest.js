'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Location from '../../../../src/data/Location';

import LocationTranslator from '../../../../src/services/translators/geocode/LocationTranslator';

chai.use(sinonChai);

const expect = chai.expect;

describe('Location Translation', () => {
  const translator = new LocationTranslator();
  const location = {};
  location[translator.LATITUDE_FIELD_NAME] = 1.234;
  location[translator.LONGITUDE_FIELD_NAME] = 5.678;

  const address = {};
  address[translator.LOCATION_FIELD_NAME] = location;

  const json = {};
  json[translator.FORMATTED_ADDRESS_FIELD_NAME] = 'foo';
  json[translator.GEOMETRY_ADDRESS_FIELD_NAME] = address;

  describe('JSON Validation', () => {
    describe('Valid', () => {
      it('should be valid', () => expect(translator.isValid(json)).to.be.true);
    });

    describe('Invalid', () => {
      const test = {};

      afterEach(() => expect(translator.isValid(test)).to.be.false);

      it('invalid due to missing formatted address field', () => {});

      it('invalid due to missing geometry address field', () => {
        test[translator.FORMATTED_ADDRESS_FIELD_NAME] = {};
      });

      it('invalid due to missing location field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME] = {};
      });

      it('invalid due to missing latitude field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][translator.LOCATION_FIELD_NAME] = {};
      });

      it('invalid due to missing longitude field', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][translator.LOCATION_FIELD_NAME][translator.LATITUDE_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid address type', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][translator.LOCATION_FIELD_NAME][translator.LONGITUDE_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid latitude type', () => {
        test[translator.FORMATTED_ADDRESS_FIELD_NAME] = 'foo';
      });

      it('invalid due to invalid longitude type', () => {
        test[translator.GEOMETRY_ADDRESS_FIELD_NAME][translator.LOCATION_FIELD_NAME][translator.LATITUDE_FIELD_NAME] = 1.234; // eslint-disable-line max-len
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
        coordinate: {
          latitude: 1.234,
          longitude: 5.678,
        },
      });
      const isValid = sinon.stub(translator, 'isValid').returns(true);
      expect(translator.translate(json)).to.eql(expected);
      isValid.restore();
    });
  });
});
