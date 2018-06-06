#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import { buildPriceEstimates } from '..';

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .option('-u, --unit [unit]', 'specify distance unit')
  .parse(process.argv);

const { start, end, unit } = program;

buildPriceEstimates({ startAddress: start, endAddress: end, distanceUnitName: unit })
  .catch(e => console.error('Could not get price estimates:\n', e));
