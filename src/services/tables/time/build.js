import Table from 'cli-table2';

import formatDuration from '../../formatDuration';
import symbols from '../../symbols';

const headers = [ symbols.DURATION, symbols.VEHICLE ]
  .map(symbol => ({
    content: symbol,
    hAlign: 'center',
  }));

const buildRows = estimates => {
  estimates.sort((firstEstimate, secondEstimate) => (firstEstimate.estimatedDuration.length - secondEstimate.estimatedDuration.length));
  const groupedEstimates = groupEstimatesByTime(estimates);
  return Object.keys(groupedEstimates).map(key => [ key, groupedEstimates[key].join(', ') ]);
};

const groupEstimatesByTime = estimates => {
  const rows = {};

  estimates.forEach(({ estimatedDuration, productName }) => {
    const formattedDuration = formatDuration(estimatedDuration);
    let productsWithSameDuration = rows[formattedDuration];

    if (!productsWithSameDuration) {
      productsWithSameDuration = [];
    }

    productsWithSameDuration.push(productName);
    rows[formattedDuration] = productsWithSameDuration;
  });

  return rows;
};

const build = ({ estimates, location }) => {
  const table = new Table();

  table.push([
    {
      colSpan: 2,
      content: `${symbols.ORIGIN} ${location.name}`,
      hAlign: 'center',
    },
  ]);
  table.push(headers);

  buildRows(estimates).forEach(row => table.push(row));

  return table.toString();
};

export default build;
