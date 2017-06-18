import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

export default class TripPriceEstimatesTableBuilder {
  constructor(rowFormatter) {
    this.rowFormatter = rowFormatter;
  }

  build(estimates, presentationDistanceUnit) {
    const table = this.buildInitialTable();
    estimates.estimates.forEach((estimate) => {
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
      emoji.get('oncoming_automobile'),
      emoji.get('money_with_wings'),
      emoji.get('arrows_clockwise'),
      emoji.get('hourglass_flowing_sand'),
      `${emoji.get('boom')} Surge${emoji.get('boom')}`,
    );
  }

  buildInitialTable() {
    const table = new Table();
    const formattedHeaders = List(this.getTableHeaders().map(header => Map({ content: header, hAlign: 'center' })));
    table.push(formattedHeaders.toJS());
    return table;
  }

  buildLocationRow(name, isEnd) {
    let symbol = emoji.get('round_pushpin');
    if (isEnd) {
      symbol = emoji.get('end');
    }

    return List.of(
      Map({
        colSpan: 1,
        content: symbol,
        hAlign: 'center',
      }),
      Map({
        colSpan: 4,
        content: name,
      }),
    );
  }
}
