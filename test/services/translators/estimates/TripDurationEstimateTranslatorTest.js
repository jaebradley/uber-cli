'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

const expect = chai.expect;

import Duration from '../../../../src/data/Duration';
import TimeUnit from '../../../../src/data/TimeUnit';
import TripDurationEstimate from '../../../../src/data/TripDurationEstimate';

import TripDurationEstimateTranslator from '../../../../src/services/translators/estimates/TripDurationEstimateTranslator';

describe('Trip Duration Estimate Translation', function() {
  const productName = 'foo';
  const estimateSeconds = 1234;
  const translator = new TripDurationEstimateTranslator();

  let estimate = {};
  estimate[TripDurationEstimateTranslator.getProductNameFieldName()] = productName;
  estimate[TripDurationEstimateTranslator.getEstimateFieldName()] = estimateSeconds;

  describe('JSON Validation', () => {

    describe('Valid', () => {
      it('should be valid', () => {
        expect(translator.isValid(estimate)).to.be.true;
      });
    });

    describe('Invalid', () => {
      let invalid = {};

      afterEach(function() {
        expect(translator.isValid(invalid)).to.be.false;
      });

      it('invalid due to missing product name field', () => {});

      it('invalid due to missing estimate field', () => {});

      it('invalid due to invalid product name type', () => {
        invalid[TripDurationEstimateTranslator.getProductNameFieldName()] = 1.234;
      });

      it('invalid due to invalid estimate type', () => {
        invalid[TripDurationEstimateTranslator.getEstimateFieldName()] = 'bar';
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
      const expected = new TripDurationEstimate({
        productName: productName,
        estimatedDuration: new Duration({
          length: estimateSeconds,
          unit: TimeUnit.SECOND
        })
      });
      const isValid = sinon.stub(translator, 'isValid').returns(true);
      expect(translator.translate(estimate)).to.eql(expected);
      isValid.restore();
    });
  });
});
