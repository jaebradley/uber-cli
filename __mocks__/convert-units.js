const to = jest.fn(() => 1234);

const from = jest.fn(() => ({ to }));

const constructor = jest.fn(() => ({ from }));

const convert = constructor;

export default convert;

export {
  to,
  from,
};
