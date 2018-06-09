import DistanceUnit from './data/DistanceUnit';
import UberService from './services/UberService';
import {
  convertDistance,
  convertDuration,
} from './services/converters';
import { default as buildPriceEstimatesTable } from './services/tables/price/build';
import { default as buildTimeEstimatesTable } from './services/tables/time/build';
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
  console.log(buildPriceEstimatesTable({ estimates, presentationUnits: distanceUnit }));
}

const buildTimeEstimates = async (address) => {
  if (typeof address !== 'string') {
    throw new TypeError('Address should be a string');
  }

  const uberService = new UberService();
  const estimates = await uberService.getTimeEstimates(address);
  console.log(buildTimeEstimatesTable({ estimates: estimates.estimates, location: estimates.location }));
}

export {
  buildPriceEstimates,
  buildTimeEstimates,
};
