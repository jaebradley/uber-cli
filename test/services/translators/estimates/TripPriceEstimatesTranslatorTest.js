import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { List } from 'immutable';

import TripPriceEstimateTranslator from '../../../../src/services/translators/estimates/TripPriceEstimateTranslator';
import TripPriceEstimatesTranslator from '../../../../src/services/translators/estimates/TripPriceEstimatesTranslator';

chai.use(sinonChai);

const expect = chai.expect;

describe('Trip Price Estimates Translation', () => {
  const estimateTranslator = new TripPriceEstimateTranslator();
  const translator = new TripPriceEstimatesTranslator(estimateTranslator);
  const valid = { prices: [] };

  describe('JSON Validation', () => {
    describe('Valid', () => {
      it('should be valid', () => expect(translator.isValid(valid)).to.be.true);
    });

    describe('Invalid', () => {
      const invalid = {};

      afterEach(() => expect(translator.isValid(invalid)).to.be.false);

      it('invalid due to missing prices name field', () => {});

      it('invalid due to wrong prices type', () => {
        invalid[TripPriceEstimatesTranslator.getPricesFieldName()] = 1;
      });
    });
  });

  describe('Translate Estimates', () => {
    const estimates = {
      prices: [1, 2, 3],
    };

    describe('Invalid', () => {
      before(() => {
        this.isValid = sinon.stub(translator, 'isValid').returns(false);
      });

      after(() => {
        this.isValid.restore();
      });

      it('throws for invalid estimate', () => {
        expect(() => translator.translate({})).to.throw(Error);
      });
    });

    describe('Valid', () => {
      before(() => {
        this.isValid = sinon.stub(translator, 'isValid').returns(true);
        this.translateEstimate = sinon.stub(estimateTranslator, 'translate').callsFake(() => 'bar');
      });

      after(() => {
        this.isValid.restore();
        this.translateEstimate.restore();
      });

      it('translates valid estimates', () => {
        const expected = List.of('bar', 'bar', 'bar');
        expect(translator.translate(estimates)).to.eql(expected);
      });
    });
  });
});
