'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

const expect = chai.expect;

import { Map } from 'immutable';

import Distance from '../../../../src/data/Distance';
import DistanceUnit from '../../../../src/data/DistanceUnit';
import Duration from '../../../../src/data/Duration';
import PriceRange from '../../../../src/data/PriceRange';
import TimeUnit from '../../../../src/data/TimeUnit';
import TripPriceEstimate from '../../../../src/data/TripPriceEstimate';

import TripPriceEstimateTranslator from '../../../../src/services/translators/estimates/TripPriceEstimateTranslator';

describe('Trip Price Estimate Translation', function() {
  const productName = 'foo';
  const distance = 1.234;
  const duration = 2;
  const highEstimate = 3;
  const lowEstimate = 4;
  const currencyCode = 'bar';
  const surgeMultiplier = 2.345;
  const translator = new TripPriceEstimateTranslator();

  let estimateWithoutSurgeMultiplier = {};
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getProductNameFieldName()] = productName;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getDistanceFieldName()] = distance;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getDurationFieldName()] = duration;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getHighEstimateFieldName()] = highEstimate;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getLowEstimateFieldName()] = lowEstimate;
  estimateWithoutSurgeMultiplier[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = currencyCode;

  let estimateWithSurgeMultiplier = {};
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getProductNameFieldName()] = productName;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getDistanceFieldName()] = distance;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getDurationFieldName()] = duration;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getHighEstimateFieldName()] = highEstimate;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getLowEstimateFieldName()] = lowEstimate;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getCurrencyCodeFieldName()] = currencyCode;
  estimateWithSurgeMultiplier[TripPriceEstimateTranslator.getSurgeMultiplierFieldName()] = surgeMultiplier;

  describe('JSON Validation', () => {

    describe('Valid', () => {
      it('should be valid', () => {
        expect(translator.isValid(estimateWithoutSurgeMultiplier)).to.be.true;
        expect(translator.isValid(estimateWithSurgeMultiplier)).to.be.true;
      });
    });

    describe('Invalid', () => {
      let invalid = {};

      afterEach(function() {
        expect(translator.isValid(invalid)).to.be.false;
      });

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
      productName: productName,
      distance: new Distance({
        value: distance,
        unit: DistanceUnit.MILE
      }),
      duration: new Duration({
        length: duration,
        unit: TimeUnit.SECOND
      }),
      range: new PriceRange({
        high: highEstimate,
        low: lowEstimate,
        currencyCode: currencyCode
      })
    });
    const argsWithSurgeMultiplier = args.set('surgeMultiplier', surgeMultiplier);

    describe('Invalid', () => {
      before( () => {
        this.isValid = sinon.stub(translator, 'isValid').returns(false);
      });

      after( () => {
        this.isValid.restore();
      });

      it('throws for invalid estimate', () => {
        expect(() => translator.translate({})).to.throw(Error);
      });
    });

    describe('Valid', () => {
      before( () => {
        this.isValid = sinon.stub(translator, 'isValid').returns(true);
      });

      after( () => {
        this.isValid.restore();
      });

      it('translates valid estimate without surge multiplier', () => {
        const expected = new TripPriceEstimate(args);
        expect(translator.translate(estimateWithoutSurgeMultiplier)).to.eql(expected);
      });

      it('translates valid estimate with surge multiplier', () => {
        const expected = new TripPriceEstimate(argsWithSurgeMultiplier);
        expect(translator.translate(estimateWithSurgeMultiplier)).to.eql(expected);
      });
    });
  });
});
