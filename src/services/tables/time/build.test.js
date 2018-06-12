import TimeUnit from '../../../data/TimeUnit';

import build from './build';

jest.unmock('convert-units');

describe('#build', () => {
  const location = { name: 'foobar' };

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
    const expected = '\u001b[90m┌─────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m        📍 foobar         \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┬────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m   ⏳    \u001b[90m│\u001b[39m       🚘        \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 0 sec. \u001b[90m│\u001b[39m third product  \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 1 min. \u001b[90m│\u001b[39m second product \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 min. \u001b[90m│\u001b[39m first product  \u001b[90m│\u001b[39m\n\u001b[90m└────────\u001b[39m\u001b[90m┴────────────────┘\u001b[39m';
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
    const expected = '\u001b[90m┌───────────────────────────────────────────────────────┐\u001b[39m\n\u001b[90m│\u001b[39m                       📍 foobar                        \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┬──────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m   ⏳    \u001b[90m│\u001b[39m                      🚘                       \u001b[90m│\u001b[39m\n\u001b[90m├────────\u001b[39m\u001b[90m┼──────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m 2 min. \u001b[90m│\u001b[39m first product, second product, third product \u001b[90m│\u001b[39m\n\u001b[90m└────────\u001b[39m\u001b[90m┴──────────────────────────────────────────────┘\u001b[39m';
    expect(build({ estimates, location })).toEqual(expected);
  });
});
