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

import PickupTimeEstimatesTableBuilder from '../../../../src/services/tables/builders/PickupTimeEstimatesTableBuilder';

const expect = chai.expect;

describe('Pickup Time Estimates Table Builder', () => {
  const tableBuilder = new PickupTimeEstimatesTableBuilder();

  describe('table headers', () => {
    it('fetch succeeds', () => {
      const expected = List.of(
        emoji.get('hourglass_flowing_sand'),
        emoji.get('oncoming_automobile')
      );

      expect(tableBuilder.getTableHeaders()).to.eql(expected);
    });
  });

  describe('formatted location', () => {
    it('fetch succeeds', () => {
      const locationName = 'jaebaebae';
      const expected = List.of(
        Map({
          colSpan: 2,
          content: `${emoji.get('round_pushpin')} ${locationName}`,
          hAlign: 'center'
        })
      );
      expect(tableBuilder.getFormattedLocation(locationName)).to.eql(expected);
    });
  });

  describe('formatted headers', () => {
    it('fetch succeeds', () => {
      const tableHeadersFetching = sinon.stub(tableBuilder, 'getTableHeaders').returns(List.of(1, 2, 3));
      const expected = List.of(
        Map({
          content: 1,
          hAlign: 'center'
        }),
        Map({
          content: 2,
          hAlign: 'center'
        }),
        Map({
          content: 3,
          hAlign: 'center'
        })
      );
      expect(tableBuilder.getFormattedHeaders()).to.eql(expected);
      tableHeadersFetching.restore();
    });
  });

  describe('initial table', () => {
    it('build succeeds', () => {
      const tableLocationFormatting = sinon.stub(tableBuilder, 'getFormattedLocation').returns(List.of(1, 2, 3));
      const tableHeadersFetching = sinon.stub(tableBuilder, 'getFormattedHeaders').returns(List.of('jae', 'baebae'));
      const expected = new Table();
      expected.push([
        1, 2, 3
      ]);
      expected.push([
        'jae', 'baebae'
      ]);
      const initialTable = tableBuilder.buildInitialTable();

      console.log(`Expect initial table to look like: ${expected}`);
      console.log(`Initial table actually looks like: ${initialTable}`)

      expect(initialTable).to.eql(expected);
      tableLocationFormatting.restore();
      tableHeadersFetching.restore();
    });
  });
});
