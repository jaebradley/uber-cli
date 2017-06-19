import Table from 'cli-table2';
import { List, Map } from 'immutable';
import emoji from 'node-emoji';

export default class PickupTimeEstimatesTableBuilder {
  constructor(rowsBuilder) {
    this.rowsBuilder = rowsBuilder;
  }

  build(estimates) {
    const table = this.buildInitialTable(estimates.location.name);
    this.rowsBuilder.build(estimates.estimates).forEach(row => table.push(row.toJS()));
    return table.toString();
  }

  getTableHeaders() {
    return List.of(
      emoji.get('hourglass_flowing_sand'),
      emoji.get('oncoming_automobile'),
    );
  }

  getFormattedLocation(locationName) {
    return List.of(
      Map({
        colSpan: 2,
        content: `${emoji.get('round_pushpin')} ${locationName}`,
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
