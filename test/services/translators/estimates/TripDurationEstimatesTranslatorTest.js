'use es6';

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
const expect = chai.expect;

import { List } from 'immutable';

import TripDurationEstimateTranslator from '../../../../src/services/translators/estimates/TripDurationEstimateTranslator';
import TripDurationEstimatesTranslator from '../../../../src/services/translators/estimates/TripDurationEstimatesTranslator';

describe('Trip Duration Estimats Translation', function() {
  const testValue = 'jaebaebae';

  const estimateTranslator = new TripDurationEstimateTranslator();
  const translator = new TripDurationEstimatesTranslator(estimateTranslator);

  let valid = {};
  valid[TripDurationEstimatesTranslator.getEstimatedDurationsFieldName()] = [
    1, 2, 3
  ];

  describe('Estimates Validation', () => {

    describe('Valid Estimates', () => {
      it('is valid', () => {
        expect(translator.isValid(valid)).to.be.true;
      });
    });

    describe('Invalid Estimates', () => {
      let invalid = {};

      afterEach(() => {
        expect(translator.isValid(invalid)).to.be.false;
      });

      it('is invalid due to missing estimated durations field', () => {
      });

      it('is invalid due to invalid type for estimated durations field', () => {
        invalid[TripDurationEstimatesTranslator.getEstimatedDurationsFieldName()] = testValue;
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
      const translateEstimate = sinon.stub(estimateTranslator, 'translate')
                                     .returns((value) => {
                                       `translated ${value}`;
                                     });
      const isValid = sinon.stub(translator, 'isValid')
                           .returns(true);
      const expected = List.of('translated 1', 'translated 2', 'translated 3');
      translateEstimate.restore();
      isValid.restore();
    });
  });
});
