import DistanceUnit from './data/DistanceUnit';
import UberService from './services/UberService';
import buildPriceEstimatesTable from './services/tables/price/build';
import buildTimeEstimatesTable from './services/tables/time/build';

const buildPriceEstimates = async ({ startAddress, endAddress, distanceUnitName }) => {
  if (typeof startAddress !== 'string' || typeof endAddress !== 'string') {
    throw new TypeError('Start and End addresses (-s \'<address>\' -e \'<address>\') are required.');
  }

  const distanceUnit = distanceUnitName
    ? DistanceUnit[distanceUnitName.toUpperCase()]
    : DistanceUnit.MILE;
  const uberService = new UberService();
  const estimates = await uberService.getPriceEstimates({ startAddress, endAddress });
  console.log(buildPriceEstimatesTable({ estimates, presentationUnits: distanceUnit }));
};

const buildTimeEstimates = async (address) => {
  if (typeof address !== 'string') {
    throw new TypeError('Address should be a string');
  }

  const uberService = new UberService();
  const estimates = await uberService.getTimeEstimates(address);
  console.log(buildTimeEstimatesTable({
    estimates: estimates.estimates,
    location: estimates.location,
  }));
};

export {
  buildPriceEstimates,
  buildTimeEstimates,
};
