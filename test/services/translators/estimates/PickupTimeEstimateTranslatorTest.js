import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import TimeUnit from '../../../../src/data/TimeUnit';
import PickupTimeEstimate from '../../../../src/data/PickupTimeEstimate';

import PickupTimeEstimateTranslator from '../../../../src/services/translators/estimates/PickupTimeEstimateTranslator';

chai.use(sinonChai);

const expect = chai.expect;

describe('Pickup Time Estimate Translation', () => {
  const productName = 'foo';
  const estimateSeconds = 1234;
  const translator = new PickupTimeEstimateTranslator();

  const estimate = {};
  estimate[PickupTimeEstimateTranslator.getProductNameFieldName()] = productName;
  estimate[PickupTimeEstimateTranslator.getEstimateFieldName()] = estimateSeconds;

  describe('JSON Validation', () => {
    describe('Valid', () => {
      it('should be valid', () => expect(translator.isValid(estimate)).to.be.true);
    });

    describe('Invalid', () => {
      const invalid = {};

      afterEach(() => expect(translator.isValid(invalid)).to.be.false);

      it('invalid due to missing product name field', () => {});

      it('invalid due to missing estimate field', () => {});

      it('invalid due to invalid product name type', () => {
        invalid[PickupTimeEstimateTranslator.getProductNameFieldName()] = 1.234;
      });

      it('invalid due to invalid estimate type', () => {
        invalid[PickupTimeEstimateTranslator.getEstimateFieldName()] = 'bar';
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
      const expected = new PickupTimeEstimate({
        productName,
        estimatedDuration: {
          length: estimateSeconds,
          unit: TimeUnit.SECOND,
        },
      });
      const isValid = sinon.stub(translator, 'isValid').returns(true);
      expect(translator.translate(estimate)).to.eql(expected);
      isValid.restore();
    });
  });
});
