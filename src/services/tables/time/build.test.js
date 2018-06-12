import TimeUnit from '../../../data/TimeUnit';

import build from './build';

jest.unmock('convert-units');

describe('#build', () => {
  const realProcess = global.process;
  const mockedProcess = { platform: 'darwin' };
  const location = { name: 'foobar' };

  beforeEach(() => {
    global.process = mockedProcess;
  });

  afterEach(() => {
    global.process = realProcess;
  });

  // both tests use emojis and assumes process.platform = darwin
  // apologies in advance if this causes problems

  it('builds table for products that do not share same formatted duration', () => {
    const estimates = [
      {
        estimatedDuration: { length: 120, unit: TimeUnit.SECOND },
        productName: 'first product',
      },
      {
        estimatedDuration: { length: 60, unit: TimeUnit.SECOND },
        productName: 'second product',
      },
      {
        estimatedDuration: { length: 0, unit: TimeUnit.SECOND },
        productName: 'third product',
      },
    ];
    const expected = '┌─────────────────────────┐\n│        📍 foobar         │\n├────────┬────────────────┤\n│   ⏳    │       🚘        │\n├────────┼────────────────┤\n│ 0 sec. │ third product  │\n├────────┼────────────────┤\n│ 1 min. │ second product │\n├────────┼────────────────┤\n│ 2 min. │ first product  │\n└────────┴────────────────┘';
    expect(build({ estimates, location })).toEqual(expected);
  });

  it('builds table for products that do share same formatted duration', () => {
    const estimates = [
      {
        estimatedDuration: { length: 120, unit: TimeUnit.SECOND },
        productName: 'first product',
      },
      {
        estimatedDuration: { length: 120, unit: TimeUnit.SECOND },
        productName: 'second product',
      },
      {
        estimatedDuration: { length: 120, unit: TimeUnit.SECOND },
        productName: 'third product',
      },
    ];
    const expected = '┌───────────────────────────────────────────────────────┐\n│                       📍 foobar                        │\n├────────┬──────────────────────────────────────────────┤\n│   ⏳    │                      🚘                       │\n├────────┼──────────────────────────────────────────────┤\n│ 2 min. │ first product, second product, third product │\n└────────┴──────────────────────────────────────────────┘';
    expect(build({ estimates, location })).toEqual(expected);
  });
});
