'use es6';

import Table from 'cli-table2';
import { List, Map } from 'immutable';

export default class TripPriceEstimatesTableBuilder {
  constructor(rowFormatter, symbolService) {
    this.rowFormatter = rowFormatter;
    this.symbolService = symbolService;
  }

  build(estimates, presentationDistanceUnit) {
    let table = this.buildInitialTable();
    estimates.estimates.forEach(estimate => {
      if (estimate.productName !== 'TAXI') {
        table.push(this.rowFormatter.format(estimate, presentationDistanceUnit).toJS());
      }
    });
    table.push(this.buildLocationRow(estimates.start.name, false).toJS());
    table.push(this.buildLocationRow(estimates.end.name, true).toJS());
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      this.symbolService.getVehicleSymbol(),
      this.symbolService.getPriceSymbol(),
      this.symbolService.getTripDistanceSymbol(),
      this.symbolService.getDurationSymbol(),
      `${this.symbolService.getSurgeSymbol()} Surge${this.symbolService.getSurgeSymbol()}`
    );
  }

  buildInitialTable() {
    let table = new Table();
    let formattedHeaders = List(this.getTableHeaders().map(header => Map({
      content: header, hAlign: 'center'
    })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  buildLocationRow(name, isEnd) {
    const symbol = isEnd ? this.symbolService.getDestinationSymbol() : this.symbolService.getOriginSymbol();

    return List.of(
      Map({
        colSpan: 1,
        content: symbol,
        hAlign: 'center'
      }),
      Map({
        colSpan: 4,
        content: name
      })
    );
  }
}
