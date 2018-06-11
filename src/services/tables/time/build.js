import Table from 'cli-table2';

import TimeUnit from '../../../data/TimeUnit';
import { formatSeconds } from '../../formatters';
import { convertDuration } from '../../converters';
import symbols from '../../symbols';

const headers = [symbols.DURATION, symbols.VEHICLE]
  .map(symbol => ({
    content: symbol,
    hAlign: 'center',
  }));

const groupEstimatesByTime = (estimates) => {
  const rows = {};

  estimates.forEach(({ estimatedDuration, productName }) => {
    const durationInSeconds = convertDuration({
      duration: estimatedDuration,
      toUnit: TimeUnit.SECOND,
    });
    const seconds = durationInSeconds.length;
    const formattedDuration = formatSeconds(seconds);
    let productsWithSameDuration = rows[formattedDuration];

    if (!productsWithSameDuration) {
      productsWithSameDuration = [];
    }

    productsWithSameDuration.push(productName);
    rows[formattedDuration] = productsWithSameDuration;
  });

  return rows;
};

const buildRows = (estimates) => {
  estimates.sort((
    firstEstimate,
    secondEstimate,
  ) => (firstEstimate.estimatedDuration.length - secondEstimate.estimatedDuration.length));
  const groupedEstimates = groupEstimatesByTime(estimates);
  return Object.keys(groupedEstimates).map(key => [key, groupedEstimates[key].join(', ')]);
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
