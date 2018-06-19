import {
  getPassword,
  replacePassword,
} from 'keytar';

const getUberAPIToken = () => getPassword('uber-cli', 'Uber API Token');

const setUberAPIToken = token => replacePassword('uber-cli', 'Uber API Token', token);

const getGoogleMapsAPIToken = () => getPassword('uber-cli', 'Google Maps API Token');

const setGoogleMapsAPIToken = token => replacePassword('uber-cli', 'Google Maps API Token', token);

const getTokens = () => Promise.all([
  getUberAPIToken(),
  getGoogleMapsAPIToken(),
]);

export {
  getUberAPIToken,
  setUberAPIToken,
  getGoogleMapsAPIToken,
  setGoogleMapsAPIToken,
  getTokens,
};
