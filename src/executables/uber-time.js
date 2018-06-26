#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';
import { buildTimeEstimates } from '..';

program
  .description('Get Time-To-Pickup Estimates')
  .arguments('<address>')
  .action((address) => {
    buildTimeEstimates(address)
      .catch(e => console.error('Could not get time estimates:\n', e));
  })
  .parse(process.argv);
