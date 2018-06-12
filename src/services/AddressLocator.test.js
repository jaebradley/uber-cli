import { geocode } from '@google/maps';

import AddressLocator from './AddressLocator';

jest.mock('@google/maps');

describe('AddressLocator', () => {
  beforeEach(() => {
    geocode.mockClear();
  });

  describe('#getFirstLocation', () => {
    it('gets first address', async () => {
      const address = 'jaebaebae';
      const locator = new AddressLocator();
      const firstLocation = await locator.getFirstLocation(address);
      expect(firstLocation.name).toEqual('formatted address');
      expect(firstLocation.coordinate.latitude).toEqual('latitude');
      expect(firstLocation.coordinate.longitude).toEqual('longitude');
      expect(geocode).toHaveBeenCalledTimes(1);
      expect(geocode).toHaveBeenCalledWith({ address });
    });

    it('throws RangeError when no addresses are found', async () => {
      const address = 'address';
      const locator = new AddressLocator();
      try {
        await locator.getFirstLocation(address);
      } catch (e) {
        expect(e).toBeInstanceOf(RangeError);
      }
    });
  });
});
