const getFirstLocation = jest.fn((address) => {
  if (address === 'firstjaebaebae') {
    return Promise.resolve({
      coordinate: {
        latitude: 'firstjaebaebaelatitude',
        longitude: 'firstjaebaebaelongitude',
      },
    });
  }

  if (address === 'secondjaebaebae') {
    return Promise.resolve({
      coordinate: {
        latitude: 'secondjaebaebaelatitude',
        longitude: 'secondjaebaebaelongitude',
      },
    });
  }

  throw new Error(`Unknown address: ${address}`);
});

const constructor = jest.fn(() => ({ getFirstLocation }));

const AddressLocator = constructor;

export default AddressLocator;
export { getFirstLocation };
