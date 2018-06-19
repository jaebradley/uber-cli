import DistanceUnit from './data/DistanceUnit';
import UberService from './services/UberService';
import buildPriceEstimatesTable from './services/tables/price/build';
import buildTimeEstimatesTable from './services/tables/time/build';
import {
  promptUberAPIToken,
  promptGoogleMapsAPIToken,
} from './services/tokenPrompts';
import {
  setUberAPIToken,
  setGoogleMapsAPIToken,
  getTokens,
} from './services/tokenStore';


const setupUberAPIToken = async () => {
  const { uberAPIToken } = await promptUberAPIToken();
  const successful = await setUberAPIToken(uberAPIToken);
  if (!successful) {
    throw new Error('Unable to set Uber API token');
  }

  console.log('Set Uber API token');
};

const setupGoogleMapsAPIToken = async () => {
  const { googleMapsAPIToken } = await promptGoogleMapsAPIToken();
  const successful = await setGoogleMapsAPIToken(googleMapsAPIToken);
  if (!successful) {
    throw new Error('Unable to set Google Maps API token');
  }

  console.log('Set Google Maps API Token');
};

const setupTokens = async () => {
  await setupUberAPIToken();
  await setupGoogleMapsAPIToken();
};

const buildPriceEstimates = async ({ startAddress, endAddress, distanceUnitName }) => {
  if (typeof startAddress !== 'string' || typeof endAddress !== 'string') {
    throw new TypeError('Start and End addresses (-s \'<address>\' -e \'<address>\') are required.');
  }

  const distanceUnit = distanceUnitName
    ? DistanceUnit[distanceUnitName.toUpperCase()]
    : DistanceUnit.MILE;

  let [
    uberAPIToken,
    googleMapsAPIToken,
  ] = await getTokens();

  if (!uberAPIToken) {
    await setupUberAPIToken();
  }

  if (!googleMapsAPIToken) {
    await setupGoogleMapsAPIToken();
  }

  [
    uberAPIToken,
    googleMapsAPIToken,
  ] = await getTokens();

  const uberService = new UberService({ uberAPIToken, googleMapsAPIToken });

  const estimates = await uberService.getPriceEstimates({ startAddress, endAddress });
  console.log(buildPriceEstimatesTable({ estimates, presentationUnits: distanceUnit }));
};

const buildTimeEstimates = async (address) => {
  if (typeof address !== 'string') {
    throw new TypeError('Address should be a string');
  }

  let [
    uberAPIToken,
    googleMapsAPIToken,
  ] = await getTokens();

  if (!uberAPIToken) {
    await setupUberAPIToken();
  }

  if (!googleMapsAPIToken) {
    await setupGoogleMapsAPIToken();
  }

  [
    uberAPIToken,
    googleMapsAPIToken,
  ] = await getTokens();

  const uberService = new UberService({ uberAPIToken, googleMapsAPIToken });

  const estimates = await uberService.getTimeEstimates(address);
  console.log(buildTimeEstimatesTable({
    estimates: estimates.estimates,
    location: estimates.location,
  }));
};

export {
  buildPriceEstimates,
  buildTimeEstimates,
  setupUberAPIToken,
  setupGoogleMapsAPIToken,
  setupTokens,
};
