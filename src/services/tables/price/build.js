import Table from 'cli-table2';

import TimeUnit from '../../../data/TimeUnit';
import symbols from '../../symbols';
import {
  formatSurgeMultiplier,
  formatDistance,
  formatPriceRange,
  formatSeconds,
} from '../../formatters';

import {
  convertDuration,
  convertDistance,
} from '../../converters';

const headers = [
  symbols.VEHICLE,
  symbols.PRICE,
  symbols.TRIP_DISTANCE,
  symbols.DURATION,
  `${symbols.SURGE_EXISTS} Surge${symbols.SURGE_EXISTS}`,
].map(symbol => ({ content: symbol, hAlign: 'center' }));

const buildRow = ({ estimate, presentationUnits }) => {
  const {
    productName,
    range,
    distance,
    duration,
    surgeMultiplier,
  } = estimate;

  const { length: seconds } = convertDuration({ duration, toUnit: TimeUnit.SECOND });
  const convertedDistance = convertDistance({ distance, toUnit: presentationUnits });

  return [
    productName,
    formatPriceRange(range),
    formatDistance(convertedDistance),
    formatSeconds(seconds),
    formatSurgeMultiplier(surgeMultiplier),
  ];
};

const build = ({ estimates, presentationUnits }) => {
  estimates.estimates.sort((
    firstEstimate,
    secondEstimate,
  ) => (firstEstimate.range.low - secondEstimate.range.low));

  const {
    estimates: priceEstimates,
    start,
    end,
  } = estimates;

  const table = new Table();
  table.push(headers);

  priceEstimates.forEach((estimate) => {
    if (estimate.productName.toUpperCase() !== 'TAXI') {
      table.push(buildRow({ estimate, presentationUnits }));
    }
  });

  table.push([
    {
      colSpan: 1,
      content: symbols.ORIGIN,
      hAlign: 'center',
    },
    {
      colSpan: 4,
      content: start.name,
    },
  ]);

  table.push([
    {
      colSpan: 1,
      content: symbols.DESTINATION,
      hAlign: 'center',
    },
    {
      colSpan: 4,
      content: end.name,
    },
  ]);

  return table.toString();
};

export default build;
