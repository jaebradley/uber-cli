import Table from 'cli-table2';

export default class PickupTimeEstimatesTableBuilder {
  constructor(rowsBuilder, symbolService) {
    this.rowsBuilder = rowsBuilder;
    this.symbolService = symbolService;
  }

  build(estimates) {
    const table = this.buildInitialTable(estimates.location.name);
    this.rowsBuilder.build(estimates.estimates).forEach(row => table.push(row));
    return table.toString();
  }

  getTableHeaders() {
    return [
      this.symbolService.getDurationSymbol(),
      this.symbolService.getVehicleSymbol(),
    ];
  }

  getFormattedLocation(locationName) {
    return [
      {
        colSpan: 2,
        content: `${this.symbolService.getOriginSymbol()} ${locationName}`,
        hAlign: 'center',
      },
    ];
  }

  getFormattedHeaders() {
    return this.getTableHeaders()
      .map(header => ({
        content: header,
        hAlign: 'center',
      }));
  }

  buildInitialTable(locationName) {
    const table = new Table();
    table.push(this.getFormattedLocation(locationName));
    table.push(this.getFormattedHeaders());
    return table;
  }
}
