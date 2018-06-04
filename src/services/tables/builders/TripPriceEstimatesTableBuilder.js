import Table from 'cli-table2';

export default class TripPriceEstimatesTableBuilder {
  constructor(rowFormatter, symbolService) {
    this.rowFormatter = rowFormatter;
    this.symbolService = symbolService;
  }

  build(estimates, presentationDistanceUnit) {
    const table = this.buildInitialTable();
    estimates.estimates.forEach((estimate) => {
      if (estimate.productName !== 'TAXI') {
        table.push(this.rowFormatter.format(estimate, presentationDistanceUnit));
      }
    });
    table.push(this.buildLocationRow(estimates.start.name, false));
    table.push(this.buildLocationRow(estimates.end.name, true));
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      this.symbolService.getVehicleSymbol(),
      this.symbolService.getPriceSymbol(),
      this.symbolService.getTripDistanceSymbol(),
      this.symbolService.getDurationSymbol(),
      `${this.symbolService.getSurgeSymbol()} Surge${this.symbolService.getSurgeSymbol()}`,
    );
  }

  buildInitialTable() {
    const table = new Table();
    const formattedHeaders = this.getTableHeaders().map(header => ({ content: header, hAlign: 'center' }));
    table.push(formattedHeaders);
    return table;
  }

  buildLocationRow(name, isEnd) {
    return [
      {
        colSpan: 1,
        content: this.getEndSymbol(isEnd),
        hAlign: 'center',
      },
      {
        colSpan: 4,
        content: name,
      },
    ];
  }

  getEndSymbol(isEnd) {
    return isEnd ?
      this.symbolService.getDestinationSymbol() :
      this.symbolService.getOriginSymbol();
  }
}
