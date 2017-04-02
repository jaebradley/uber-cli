'use es6';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(chaiImmutable);
chai.use(sinonChai);

import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

import TripPriceEstimateRowFormatter from '../../../../src/services/tables/TripPriceEstimateRowFormatter';
import TripPriceEstimatesTableBuilder from '../../../../src/services/tables/builders/TripPriceEstimatesTableBuilder';

const expect = chai.expect;

describe('Trip Price Estimates Table Builder', () => {
  const rowFormatter = new TripPriceEstimateRowFormatter();
  const tableBuilder = new TripPriceEstimatesTableBuilder(rowFormatter);

  describe('table headers', () => {
    it('fetch succeeds', () => {
      const expected = List.of(
        emoji.get('oncoming_automobile'),
        emoji.get('money_with_wings'),
        emoji.get('arrows_clockwise'),
        emoji.get('hourglass_flowing_sand'),
        `${emoji.get('boom')} Surge${emoji.get('boom')}`
      );

      expect(tableBuilder.getTableHeaders()).to.eql(expected);
    });
  });

  describe('initial table', () => {
    it('build succeeds', () => {
      const tableHeadersFetching = sinon.stub(tableBuilder, 'getTableHeaders').returns(List.of(1, 2, 3));
      const expected = new Table();
      expected.push([
        {
          content: 1,
          hAlign: 'center'
        },
        {
          content: 2,
          hAlign: 'center'
        },
        {
          content: 3,
          hAlign: 'center'
        }
      ]);
      expect(tableBuilder.buildInitialTable()).to.eql(expected);
      tableHeadersFetching.restore();
    });
  });

  describe('location row', () => {
    const name = 'jaebaebae';

    it('builds for end', () => {
      const expected = List.of(
        Map({
          colSpan: 1,
          content: emoji.get('end'),
          hAlign: 'center'
        }),
        Map({
          colSpan: 4,
          content: name
        })
      );
      expect(tableBuilder.buildLocationRow(name, true)).to.eql(expected);
    });

    it('builds for not end', () => {
      const expected = List.of(
        Map({
          colSpan: 1,
          content: emoji.get('round_pushpin'),
          hAlign: 'center'
        }),
        Map({
          colSpan: 4,
          content: name
        })
      );
      expect(tableBuilder.buildLocationRow(name, false)).to.eql(expected);
    });
  });
});
