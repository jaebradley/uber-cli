const geocode = jest.fn(({ address }) => ({
  asPromise: () => {
    if (address === 'jaebaebae') {
      return Promise.resolve({
        json: {
          results: [{
            formatted_address: 'formatted address',
            geometry: {
              location: {
                lat: 'latitude',
                lng: 'longitude',
              },
            },
          }],
        },
      });
    }

    return Promise.resolve({ json: { results: [] } });
  },
}));

const createClient = jest.fn(() => ({ geocode }));

export default { createClient };
export { geocode };
