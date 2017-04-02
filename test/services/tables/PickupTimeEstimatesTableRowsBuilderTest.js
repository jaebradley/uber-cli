'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiImmutable);
chai.use(sinonChai);

import { List, Map, Seq } from 'immutable';
import emoji from 'node-emoji';

import DurationConverter from '../../../src/services/DurationConverter';
import DurationFormatter from '../../../src/services/DurationFormatter';
import PickupTimeEstimatesTableRowsBuilder from '../../../src/services/tables/PickupTimeEstimatesTableRowsBuilder';

const expect = chai.expect;

describe('Pickup Time Estimates Table Rows Builder', () => {
  const durationConverter = new DurationConverter();
  const durationFormatter = new DurationFormatter(durationConverter);
  const rowsBuilder = new PickupTimeEstimatesTableRowsBuilder(durationFormatter);
  const estimate = {
    productName: 'jaebaebae',
    duration: 1
  };
  const anotherEstimate = {
    productName: 'bae jadley',
    duration: 2
  };
  const estimates = List.of(estimate, anotherEstimate);

  describe('builds rows', () => {
    it('empty estimates', () => {
      expect(rowsBuilder.build(List())).to.eql(List());
    });

    it('one estimate', () => {
      const durationFormatting = sinon.stub(durationFormatter, 'format').returns('foo');
      const expectedJS = [
        [
          'foo',
          ['jaebaebae']
        ]
      ];
      expect(rowsBuilder.build(List.of(estimate)).toJS()).to.eql(expectedJS);
    });

    it('duplicate estimates', () => {
      const expectedJS = [
        [
          'foo',
          ['jaebaebae', 'bae jadley']
        ]
      ];

      expect(rowsBuilder.build(estimates).toJS()).to.eql(expectedJS)
    });
  });
});
