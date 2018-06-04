import PickupTimeEstimateTranslator from '../../../../src/services/translators/estimates/PickupTimeEstimateTranslator';
import PickupTimeEstimatesTranslator from '../../../../src/services/translators/estimates/PickupTimeEstimatesTranslator';


describe('Trip Duration Estimats Translation', () => {
  const testValue = 'jaebaebae';

  const estimateTranslator = new PickupTimeEstimateTranslator();
  const translator = new PickupTimeEstimatesTranslator(estimateTranslator);

  const valid = {};
  valid[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()] = [1, 2, 3];

  describe('Estimates Validation', () => {
    describe('Valid Estimates', () => {
      it('is valid', () => expect(translator.isValid(valid)).to.be.true);
    });

    describe('Invalid Estimates', () => {
      const invalid = {};

      afterEach(() => expect(translator.isValid(invalid)).to.be.false);

      it('is invalid due to missing estimated durations field', () => {});

      it('is invalid due to invalid type for estimated durations field', () => {
        invalid[PickupTimeEstimatesTranslator.getEstimatedDurationsFieldName()] = testValue;
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
      const translateEstimate = sinon.stub(estimateTranslator, 'translate').callsFake(() => 'bar');
      const isValid = sinon.stub(translator, 'isValid').returns(true);
      const expected = List.of('bar', 'bar', 'bar');
      expect(translator.translate(valid)).to.eql(expected);
      translateEstimate.restore();
      isValid.restore();
    });
  });
});
