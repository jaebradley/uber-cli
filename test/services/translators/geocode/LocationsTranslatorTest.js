import LocationTranslator from '../../../../src/services/translators/geocode/LocationTranslator';
import LocationsTranslator from '../../../../src/services/translators/geocode/LocationsTranslator';

describe('Locations Translation', () => {
  const testValue = 'jaebaebae';

  const locationTranslator = new LocationTranslator();
  const translator = new LocationsTranslator(locationTranslator);
  const validJson = {};
  validJson[translator.STATUS_FIELD_NAME] = translator.EXPECTED_STATUS;
  validJson[translator.RESULTS_FIELD_NAME] = [1, 2, 3];

  describe('JSON Validation', () => {
    describe('Valid JSON', () => {
      it('is valid', () => expect(translator.isValid(validJson)).to.be.true);
    });

    describe('Invalid JSON', () => {
      const invalidJson = {};

      afterEach(() => expect(translator.isValid(invalidJson)).to.be.false);

      it('is invalid due to missing status field', () => {});

      it('is invalid due to incorrect status field', () => {
        invalidJson[translator.STATUS_FIELD_NAME] = testValue;
      });

      it('is invalid due to missing results field', () => {
        invalidJson[translator.STATUS_FIELD_NAME] = translator.EXPECTED_STATUS;
      });

      it('is invalid due to invalid results field value type', () => {
        invalidJson[translator.RESULTS_FIELD_NAME] = testValue;
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
      expect(expected).to.eql(translator.translate(validJson));
      translateLocation.restore();
      isValid.restore();
    });
  });
});
