import Table from 'cli-table2';
import { List, Map } from 'immutable';

export default class PickupTimeEstimatesTableBuilder {
  constructor(rowsBuilder, symbolService) {
    this.rowsBuilder = rowsBuilder;
    this.symbolService = symbolService;
  }

  build(estimates) {
    const table = this.buildInitialTable(estimates.location.name);
    this.rowsBuilder.build(estimates.estimates).forEach(row => table.push(row.toJS()));
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      this.symbolService.getDurationSymbol(),
      this.symbolService.getVehicleSymbol(),
    );
  }

  getFormattedLocation(locationName) {
    return List.of(
      Map({
        colSpan: 2,
        content: `${this.symbolService.getOriginSymbol()} ${locationName}`,
        hAlign: 'center',
      }),
    );
  }

  getFormattedHeaders() {
    return List(this.getTableHeaders()
      .map(header => Map({
        content: header,
        hAlign: 'center',
      })));
  }

  buildInitialTable(locationName) {
    const table = new Table();
    table.push(this.getFormattedLocation(locationName).toJS());
    table.push(this.getFormattedHeaders().toJS());
    return table;
  }
}
