/* eslint-disable no-console */

import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Table from 'cli-table2';
import { List, Map } from 'immutable';

import TripPriceEstimateRowFormatter from '../../../../src/services/tables/TripPriceEstimateRowFormatter';
import TripPriceEstimatesTableBuilder from '../../../../src/services/tables/builders/TripPriceEstimatesTableBuilder';

import SymbolService from '../../../../src/services/symbols/SymbolService';

chai.use(chaiImmutable);
chai.use(sinonChai);

const expect = chai.expect;

describe('Trip Price Estimates Table Builder', () => {
  let sandbox;

  const rowFormatter = new TripPriceEstimateRowFormatter();
  const symbolService = new SymbolService();
  const tableBuilder = new TripPriceEstimatesTableBuilder(rowFormatter, symbolService);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('#getTableHeaders', () => {
    it('succeeds', () => {
      const vehicleSymbol = 'vehicle symbol';
      const priceSymbol = 'price symbol';
      const tripDistanceSymbol = 'trip distance symbol';
      const durationSymbol = 'duration symbol';
      const surgeSymbol = 'surge symbol';
      sandbox.stub(tableBuilder.symbolService, 'getVehicleSymbol').returns(vehicleSymbol);
      sandbox.stub(tableBuilder.symbolService, 'getPriceSymbol').returns(priceSymbol);
      sandbox.stub(tableBuilder.symbolService, 'getTripDistanceSymbol').returns(tripDistanceSymbol);
      sandbox.stub(tableBuilder.symbolService, 'getDurationSymbol').returns(durationSymbol);
      sandbox.stub(tableBuilder.symbolService, 'getSurgeSymbol').returns(surgeSymbol);
      const expected = List.of(
        vehicleSymbol,
        priceSymbol,
        tripDistanceSymbol,
        durationSymbol,
        `${surgeSymbol} Surge${surgeSymbol}`,
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

    it('builds', () => {
      const endSymbol = 'end symbol';
      sandbox.stub(tableBuilder, 'getEndSymbol').returns(endSymbol);
      const expected = List.of(
        Map({
          colSpan: 1,
          content: endSymbol,
          hAlign: 'center',
        }),
        Map({
          colSpan: 4,
          content: name,
        }),
      );
      expect(tableBuilder.buildLocationRow(name, true)).to.eql(expected);
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

  describe('#getEndSymbol', () => {
    it('should return destination symbol', () => {
      const destinationSymbol = 'destination symbol';
      sandbox.stub(tableBuilder.symbolService, 'getDestinationSymbol').returns(destinationSymbol);
      expect(tableBuilder.getEndSymbol(true)).to.eql(destinationSymbol);
    });

    it('should return origin symbol', () => {
      const originSymbol = 'origin symbol';
      sandbox.stub(tableBuilder.symbolService, 'getOriginSymbol').returns(originSymbol);
      expect(tableBuilder.getEndSymbol(false)).to.eql(originSymbol);
    });
  });
});
