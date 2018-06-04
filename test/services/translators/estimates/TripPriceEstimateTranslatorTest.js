import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { Map } from 'immutable';

import DistanceUnit from '../../../../src/data/DistanceUnit';
import Duration from '../../../../src/data/Duration';
import PriceRange from '../../../../src/data/PriceRange';
import TimeUnit from '../../../../src/data/TimeUnit';
import TripPriceEstimate from '../../../../src/data/TripPriceEstimate';

import TripPriceEstimateTranslator from '../../../../src/services/translators/estimates/TripPriceEstimateTranslator';

chai.use(sinonChai);

const expect = chai.expect;

describe('Trip Price Estimate Translation', () => {
  let sandbox;

  const productName = 'foo';
  const distance = 1.234;
  const duration = 2;
  const highEstimate = 3;
  const lowEstimate = 4;
  const currencyCode = 'bar';
  const surgeMultiplier = 2.345;
  const translator = new TripPriceEstimateTranslator();

  const estimateWithoutSurgeMultiplier = {};
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getProductNameFieldName()] = productName; // eslint-disable-line max-len
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getDistanceFieldName()] = distance;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getDurationFieldName()] = duration;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getHighEstimateFieldName()] = highEstimate; // eslint-disable-line max-len
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getLowEstimateFieldName()] = lowEstimate; // eslint-disable-line max-len
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = currencyCode; // eslint-disable-line max-len

  const estimateWithSurgeMultiplier = {};
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getProductNameFieldName()] = productName;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getDistanceFieldName()] = distance;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getDurationFieldName()] = duration;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getHighEstimateFieldName()] = highEstimate; // eslint-disable-line max-len
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getLowEstimateFieldName()] = lowEstimate;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = currencyCode; // eslint-disable-line max-len
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getSurgeMultiplierFieldName()] = surgeMultiplier; // eslint-disable-line max-len

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('JSON Validation', () => {
    describe('Valid', () => {
      it('should be valid for estimate without surge', () => expect(translator.isValid(estimateWithoutSurgeMultiplier)).to.be.true);
      it('should be valid for estimate with surge', () => expect(translator.isValid(estimateWithSurgeMultiplier)).to.be.true);
    });

    describe('Invalid', () => {
      const invalid = {};

      afterEach(() => expect(translator.isValid(invalid)).to.be.false);

      it('invalid due to missing product name field', () => {});

      it('invalid due to missing distance field', () => {
        invalid[TripPriceEstimateTranslator.getProductNameFieldName()] = 1;
      });

      it('invalid due to missing high estimate field', () => {
        invalid[TripPriceEstimateTranslator.getDistanceFieldName()] = 'distance';
      });

      it('invalid due to missing low estimate', () => {
        invalid[TripPriceEstimateTranslator.getHighEstimateFieldName()] = 'highEstimate';
      });

      it('invalid due to missing duration', () => {
        invalid[TripPriceEstimateTranslator.getLowEstimateFieldName()] = 'lowEstimate';
      });

      it('invalid due to missing currency code', () => {
        invalid[TripPriceEstimateTranslator.getDurationFieldName()] = 'duration';
      });

      it('invalid due to product name type', () => {
        invalid[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = 2;
      });

      it('invalid due to distance type', () => {
        invalid[TripPriceEstimateTranslator.getProductNameFieldName()] = productName;
      });

      it('invalid due to duration type', () => {
        invalid[TripPriceEstimateTranslator.getDistanceFieldName()] = distance;
      });

      it('invalid due to null high estimate', () => {
        invalid[TripPriceEstimateTranslator.getDurationFieldName()] = duration;
        invalid[TripPriceEstimateTranslator.getHighEstimateFieldName()] = null;
      });

      it('invalid due to non-integer high estimate', () => {
        invalid[TripPriceEstimateTranslator.getHighEstimateFieldName()] = 'highEstimate';
      });

      it('invalid due to null low estimate', () => {
        invalid[TripPriceEstimateTranslator.getLowEstimateFieldName()] = null;
      });

      it('invalid due to non-integer low estimate', () => {
        invalid[TripPriceEstimateTranslator.getLowEstimateFieldName()] = 'lowEstimate';
      });

      it('invalid due to null currency code', () => {
        invalid[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = null;
      });

      it('invalid due to non-string currency code', () => {
        invalid[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = 1;
      });

      it('invalid due to non-float surge multiplier', () => {
        invalid[TripPriceEstimateTranslator.getSurgeMultiplierFieldName()] = 'surgeMultiplier';
      });
    });
  });

  describe('Translate Estimate', () => {
    const args = Map({
      productName,
      distance: {
        value: distance,
        unit: DistanceUnit.MILE,
      },
      duration: new Duration({
        length: duration,
        unit: TimeUnit.SECOND,
      }),
      range: new PriceRange({
        high: highEstimate,
        low: lowEstimate,
        currencyCode,
      }),
    });
    const argsWithSurgeMultiplier = args.set('surgeMultiplier', surgeMultiplier);

    describe('Invalid', () => {
      it('throws for invalid estimate', () => {
        sandbox.stub(translator, 'isValid').returns(false);
        expect(() => translator.translate({})).to.throw(Error);
      });
    });

    describe('Valid', () => {
      it('translates valid estimate without surge multiplier', () => {
        sandbox.stub(translator, 'isValid').returns(true);
        const expected = new TripPriceEstimate(args);
        expect(translator.translate(estimateWithoutSurgeMultiplier)).to.eql(expected);
      });

      it('translates valid estimate with surge multiplier', () => {
        sandbox.stub(translator, 'isValid').returns(true);
        const expected = new TripPriceEstimate(argsWithSurgeMultiplier);
        expect(translator.translate(estimateWithSurgeMultiplier)).to.eql(expected);
      });
    });
  });
});
