import Table from 'cli-table2';

import formatTripPriceEstimateRow from '../formatTripPriceEstimateRow';
import symbols from '../../symbols';

const headers = [
  symbols.VEHICLE,
  symbols.PRICE,
  symbols.TRIP_DISTANCE,
  symbols.DURATION,
  `${symbols.SURGE_EXISTS} Surge${symbols.SURGE_EXISTS}`,
].map(symbol => ({ content: symbol, hAlign: 'center' }));

const buildTripPriceEstimatesTable = ({ estimates, presentationUnits }) => {
  estimates.estimates.sort((firstEstimate, secondEstimate) => (firstEstimate.range.low - secondEstimate.range.low));

  const {
    estimates: priceEstimates,
    start,
    end,
  } = estimates;

  const table = new Table();
  table.push(headers);

  priceEstimates.forEach((estimate) => {
    if (estimate.productName.toUpperCase() !== 'TAXI') {
      table.push(formatTripPriceEstimateRow({ estimate, presentationUnits }));
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

export default buildTripPriceEstimatesTable;
