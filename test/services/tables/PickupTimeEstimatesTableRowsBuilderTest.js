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

  describe('groups by row', () => {
    it('empty estimates', () => {
      expect(rowsBuilder.groupByTime(List())).to.eql(Map());
    });

    it('one estimate', () => {
      const durationFormatting = sinon.stub(durationFormatter, 'format').returns('foo');
      const expectedJS = {
        'foo': ['jaebaebae']
      };

      expect(rowsBuilder.groupByTime(List.of(estimate)).toJS()).to.eql(expectedJS);

      durationFormatting.restore();
    });

    it('duplicate estimates', () => {
      const durationFormatting = sinon.stub(durationFormatter, 'format').returns('foo');
      const expectedJS = {
        'foo': ['jaebaebae', 'bae jadley']
      };

      expect(rowsBuilder.groupByTime(estimates).toJS()).to.eql(expectedJS)

      durationFormatting.restore();
    });
  });

  describe('builds', () => {
    it('succeeds', () => {
      const groups = Map({
        'foo': ['bar', 'baz'],
        'jae': ['bae']
      });
      const rowGrouping = sinon.stub(rowsBuilder, 'groupByTime').returns(groups);
      const expected = List.of(
        List.of('foo', 'bar, baz'),
        List.of('jae', 'bae')
      );

      expect(rowsBuilder.build(estimates)).to.eql(expected);

      rowGrouping.restore();
    });
  });
});
