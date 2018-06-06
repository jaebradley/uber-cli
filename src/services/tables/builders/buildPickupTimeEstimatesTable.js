import Table from 'cli-table2';

import symbols from '../../symbols';
import buildPickupTimeEstimatesTableRows from '../buildPickupTimeEstimatesTableRows';

const headers = [ symbols.DURATION, symbols.VEHICLE ]
  .map(symbol => ({
    content: symbol,
    hAlign: 'center',
  }));

const buildPickupTimeEstimatesTable = ({ estimates, location }) => {
  const table = new Table();

  table.push([
    {
      colSpan: 2,
      content: `${symbols.ORIGIN} ${location.name}`,
      hAlign: 'center',
    },
  ]);
  table.push(headers);

  buildPickupTimeEstimatesTableRows(estimates).forEach(row => table.push(row));

  return table.toString();
};

export default buildPickupTimeEstimatesTable;
