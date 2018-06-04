/* eslint-disable no-console */

import Table from 'cli-table2';

import PickupTimeEstimatesTableRowsBuilder from '../../../../src/services/tables/PickupTimeEstimatesTableRowsBuilder';
import PickupTimeEstimatesTableBuilder from '../../../../src/services/tables/builders/PickupTimeEstimatesTableBuilder';
import SymbolService from '../../../../src/services/symbols/SymbolService';

chai.use(chaiImmutable);
chai.use(sinonChai);

const expect = chai.expect;

describe('Pickup Time Estimates Table Builder', () => {
  let sandbox;

  const symbolService = new SymbolService();
  const rowsBuilder = new PickupTimeEstimatesTableRowsBuilder();
  const tableBuilder = new PickupTimeEstimatesTableBuilder(rowsBuilder, symbolService);

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('table headers', () => {
    it('fetch succeeds', () => {
      const durationSymbol = 'duration symbol';
      const vehicleSymbol = 'vehicle symbol';
      sandbox.stub(tableBuilder.symbolService, 'getDurationSymbol').returns(durationSymbol);
      sandbox.stub(tableBuilder.symbolService, 'getVehicleSymbol').returns(vehicleSymbol);

      const expected = List.of(
        durationSymbol,
        vehicleSymbol,
      );

      expect(tableBuilder.getTableHeaders()).to.eql(expected);
    });
  });

  describe('formatted location', () => {
    it('fetch succeeds', () => {
      const originSymbol = 'origin symbol';
      sandbox.stub(tableBuilder.symbolService, 'getOriginSymbol').returns(originSymbol);
      const locationName = 'jaebaebae';
      const expected = List.of(
        Map({
          colSpan: 2,
          content: `${originSymbol} ${locationName}`,
          hAlign: 'center',
        }),
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
          hAlign: 'center',
        }),
        Map({
          content: 2,
          hAlign: 'center',
        }),
        Map({
          content: 3,
          hAlign: 'center',
        }),
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
      expected.push([1, 2, 3]);
      expected.push(['jae', 'baebae']);
      const initialTable = tableBuilder.buildInitialTable();

      console.log(`Expect initial table to look like:\n${expected}`);
      console.log(`Initial table actually looks like:\n${initialTable}`);

      expect(initialTable).to.eql(expected);

      tableLocationFormatting.restore();
      tableHeadersFetching.restore();
    });
  });

  describe('build table', () => {
    it('succeeds', () => {
      const initalTableBuilding = sinon.stub(tableBuilder, 'buildInitialTable').returns([]);
      const rowsBuilding = sinon.stub(rowsBuilder, 'build').returns(List.of(List.of(1), List.of(2), List.of(3)));
      const expected = '1,2,3';

      expect(tableBuilder.build({ location: { name: 'foobar' } })).to.eql(expected);

      initalTableBuilding.restore();
      rowsBuilding.restore();
    });
  });
});
