import UberEstimatesClient from 'uber-estimates-client';

import AddressLocator from './AddressLocator';
import UberService from './UberService';

jest.mock('uber-estimates-client');
jest.mock('./AddressLocator');

describe('UberService', () => {
  let service;

  beforeEach(() => {
    UberEstimatesClient.mockClear();
    AddressLocator.mockClear();
    service = new UberService();
  });

  describe('#constructor', () => {
    it('constructs service', () => {
      expect(service).toBeDefined();
      expect(UberEstimatesClient).toHaveBeenCalledTimes(1);
      expect(AddressLocator).toHaveBeenCalledTimes(1);
    });
  });

  describe('#getTimeEstimates', () => {
    it('gets time estimates', async () => {
      const timeEstimates = await service.getTimeEstimates('firstjaebaebae');
      expect(timeEstimates.location).toEqual({ coordinate: { latitude: 'firstjaebaebaelatitude', longitude: 'firstjaebaebaelongitude' } });
      expect(timeEstimates.estimates[0].productName).toEqual('first localized display name');
    });
  });

  describe('#getPriceEstimates', () => {
    it('gets price estimates', async () => {
      const priceEstimates = await service.getPriceEstimates({
        startAddress: 'firstjaebaebae',
        endAddress: 'secondjaebaebae',
      });
      expect(priceEstimates).toBeDefined();
      expect(priceEstimates.start).toEqual({ coordinate: { latitude: 'firstjaebaebaelatitude', longitude: 'firstjaebaebaelongitude' } });
      expect(priceEstimates.estimates[0].productName).toEqual('first localized display name');
    });
  });
});
