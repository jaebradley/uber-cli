#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';
import emoji from 'node-emoji';

import CommandExecutionService from '../services/CommandExecutionService';

const isUberError = error =>
  error.name === 'Uber Error' &&
    typeof (error.code) !== 'undefined' &&
    typeof (error.error) !== 'undefined';

const isDistanceExceededError = error =>
  isUberError(error) &&
    error.code === 422 &&
    'code' in error.error &&
    error.error.code === 'distance_exceeded';

const service = new CommandExecutionService();

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .option('-u, --unit [unit]', 'specify distance unit')
  .parse(process.argv);

try {
  service.executePriceEstimates(program.start, program.end, program.unit)
    .then(table => console.log(table))
    .catch((e) => {
      if (isDistanceExceededError(e)) {
        console.log(`Maximum distance of ${emoji.get('100')}  miles exceeded between start address: ${program.start} and end address: ${program.end}`);
      } else {
        console.error('Could not get price estimates:\n', e);
      }
    });
} catch (e) {
  console.error('Could not get price estimates:\n', e);
}
