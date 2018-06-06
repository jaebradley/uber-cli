import DistanceUnit from './data/DistanceUnit';
import UberService from './services/UberService';
import {
  convertDistance,
  convertDuration,
} from './services/converters';
import buildTripPriceEstimatesTable from './services/tables/builders/buildTripPriceEstimatesTable';
import buildPickupTimeEstimatesTable from './services/tables/builders/buildPickupTimeEstimatesTable';
import symbols from './services/symbols';

const buildPriceEstimates = async ({ startAddress, endAddress, distanceUnitName }) => {
  if (typeof startAddress !== 'string' || typeof endAddress !== 'string') {
    throw new TypeError(
      'Start and End addresses (-s \'<address>\' -e \'<address>\') are required.',
    );
  }

  const distanceUnit = distanceUnitName ? DistanceUnit[distanceUnitName.toUpperCase()] : DistanceUnit.MILE;
  const uberService = new UberService();
  const estimates = await uberService.getPriceEstimates({ startAddress, endAddress });
  console.log(buildTripPriceEstimatesTable({ estimates, presentationUnits: distanceUnit }));
}

const buildTimeEstimates = async (address) => {
  if (typeof address !== 'string') {
    throw new TypeError('Address should be a string');
  }

  const uberService = new UberService();
  const estimates = await uberService.getTimeEstimates(address);
  console.log(buildPickupTimeEstimatesTable({ estimates: estimates.estimates, location: estimates.location }));
}

export {
  buildPriceEstimates,
  buildTimeEstimates,
};
