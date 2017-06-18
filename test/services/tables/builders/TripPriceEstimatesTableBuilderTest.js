/* eslint-disable no-console */

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

import TripPriceEstimateRowFormatter from '../../../../src/services/tables/TripPriceEstimateRowFormatter';
import TripPriceEstimatesTableBuilder from '../../../../src/services/tables/builders/TripPriceEstimatesTableBuilder';

chai.use(chaiImmutable);
chai.use(sinonChai);

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
        `${emoji.get('boom')} Surge${emoji.get('boom')}`,
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
          hAlign: 'center',
        },
        {
          content: 2,
          hAlign: 'center',
        },
        {
          content: 3,
          hAlign: 'center',
        },
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
          hAlign: 'center',
        }),
        Map({
          colSpan: 4,
          content: name,
        }),
      );
      expect(tableBuilder.buildLocationRow(name, true)).to.eql(expected);
    });

    it('builds for not end', () => {
      const expected = List.of(
        Map({
          colSpan: 1,
          content: emoji.get('round_pushpin'),
          hAlign: 'center',
        }),
        Map({
          colSpan: 4,
          content: name,
        }),
      );
      expect(tableBuilder.buildLocationRow(name, false)).to.eql(expected);
    });
  });

  describe('builds table', () => {
    it('without taxi', () => {
      const rowFormatting = sinon.stub(rowFormatter, 'format').callsFake((estimate, distanceUnit) => List.of(`foo_${estimate.productName}`)); // eslint-disable-line no-unused-vars
      const initialTableBuilding = sinon.stub(tableBuilder, 'buildInitialTable').returns(new Table());
      const locationRowBuilding = sinon.stub(tableBuilder, 'buildLocationRow').returns(List.of('bar'));
      const withoutTaxi = {
        start: 'jae',
        end: 'baebae',
        estimates: [
          { productName: 1 },
          { productName: 2 },
          { productName: 3 },
        ],
      };
      const expected = '\u001b[90m┌───────┐\u001b[39m\n\u001b[90m│\u001b[39m foo_1 \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m foo_2 \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m foo_3 \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m bar   \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m bar   \u001b[90m│\u001b[39m\n\u001b[90m└───────┘\u001b[39m';
      console.log(`expected without taxi: ${expected}`);
      expect(tableBuilder.build(withoutTaxi, {})).to.eql(expected);
      rowFormatting.restore();
      initialTableBuilding.restore();
      locationRowBuilding.restore();
    });

    it('with taxi', () => {
      const rowFormatting = sinon.stub(rowFormatter, 'format').callsFake((estimate, distanceUnit) => List.of(`foo_${estimate.productName}`)); // eslint-disable-line no-unused-vars
      const initialTableBuilding = sinon.stub(tableBuilder, 'buildInitialTable').returns(new Table());
      const locationRowBuilding = sinon.stub(tableBuilder, 'buildLocationRow').returns(List.of('bar'));
      const withTaxi = {
        start: 'jae',
        end: 'baebae',
        estimates: [
          { productName: 1 },
          { productName: 'TAXI' },
          { productName: 3 },
        ],
      };
      const expected = '\u001b[90m┌───────┐\u001b[39m\n\u001b[90m│\u001b[39m foo_1 \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m foo_3 \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m bar   \u001b[90m│\u001b[39m\n\u001b[90m├───────┤\u001b[39m\n\u001b[90m│\u001b[39m bar   \u001b[90m│\u001b[39m\n\u001b[90m└───────┘\u001b[39m';
      console.log(`expected with taxi: ${expected}`);
      expect(tableBuilder.build(withTaxi, {})).to.eql(expected);
      rowFormatting.restore();
      initialTableBuilding.restore();
      locationRowBuilding.restore();
    });
  });
});
