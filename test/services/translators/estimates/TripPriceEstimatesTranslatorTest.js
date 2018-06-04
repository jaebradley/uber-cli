import TripPriceEstimateTranslator from '../../../../src/services/translators/estimates/TripPriceEstimateTranslator';
import TripPriceEstimatesTranslator from '../../../../src/services/translators/estimates/TripPriceEstimatesTranslator';

describe('Trip Price Estimates Translation', () => {
  let sandbox;

  const estimateTranslator = new TripPriceEstimateTranslator();
  const translator = new TripPriceEstimatesTranslator(estimateTranslator);
  const valid = { prices: [] };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

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
    const estimates = { prices: [1, 2, 3] };

    describe('Invalid', () => {
      it('throws for invalid estimate', () => {
        sandbox.stub(translator, 'isValid').returns(false);
        expect(() => translator.translate({})).to.throw(Error);
      });
    });

    describe('Valid', () => {
      it('translates valid estimates', () => {
        sandbox.stub(translator, 'isValid').returns(true);
        sandbox.stub(estimateTranslator, 'translate').callsFake(() => 'bar');
        const expected = List.of('bar', 'bar', 'bar');
        expect(translator.translate(estimates)).to.eql(expected);
      });
    });
  });
});
