export default class PickupTimeEstimatesTableRowsBuilder {
  constructor(durationFormatter) {
    this.durationFormatter = durationFormatter;
  }

  build(estimates) {
    const estimatesGroupedByTime = this.groupByTime(estimates);
    return estimatesGroupedByTime.entrySeq().map(entry => [entry[0], entry[1]].join(', '));
  }

  groupByTime(estimates) {
    let rows = {};
    estimates.forEach((estimate) => {
      const formattedDuration = this.durationFormatter.format(estimate.estimatedDuration);

      if (rows.has(formattedDuration)) {
        const productNames = rows.get(formattedDuration);
        productNames.push(estimate.productName);
        rows = rows.set(formattedDuration, productNames);
      } else {
        rows = rows.set(formattedDuration, [estimate.productName]);
      }
    });
    return rows;
  }
}
