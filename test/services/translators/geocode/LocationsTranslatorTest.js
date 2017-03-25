'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { List } from 'immutable';

import LocationTranslator from '../../../../src/services/translators/geocode/LocationTranslator';
import LocationsTranslator from '../../../../src/services/translators/geocode/LocationsTranslator';

const expect = chai.expect;

describe('Locations Translation', function() {
  const testValue = 'jaebaebae';

  const locationTranslator = new LocationTranslator();
  const translator = new LocationsTranslator(locationTranslator);
  let valid_json = {};
  valid_json[translator.STATUS_FIELD_NAME] = translator.EXPECTED_STATUS;
  valid_json[translator.RESULTS_FIELD_NAME] = [1, 2, 3];

  describe('JSON Validation', () => {

    describe('Valid JSON', () => {
      it('is valid', () => {
        expect(translator.isValid(valid_json)).to.be.true;
      });
    });

    describe('Invalid JSON', () => {
      let invalid_json = {};

      afterEach(() => {
        expect(translator.isValid(invalid_json)).to.be.false;
      });

      it('is invalid due to missing status field', () => {
      });

      it('is invalid due to incorrect status field', () => {
        invalid_json[translator.STATUS_FIELD_NAME] = testValue;
      });

      it('is invalid due to missing results field', () => {
        invalid_json[translator.STATUS_FIELD_NAME] = translator.EXPECTED_STATUS;
      });

      it('is invalid due to invalid results field value type', () => {
        invalid_json[translator.RESULTS_FIELD_NAME] = testValue;
      });
    });
  });

  describe('Translation', () => {
    it('Throws when JSON is invalid', () => {
      const isValid = sinon.stub(translator, 'isValid').returns(false);
      expect(() => translator.translate({})).to.throw(Error);
      isValid.restore();
    });

    it('Returns list when JSON is Valid', () => {
      const translateLocation = sinon.stub(locationTranslator, 'translate')
                                     .returns(testValue);
      const isValid = sinon.stub(translator, 'isValid')
                           .returns(true);
      const expected = List.of(testValue, testValue, testValue);
      translateLocation.restore();
      isValid.restore();
    });
  });
});
