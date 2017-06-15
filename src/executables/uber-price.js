#!/usr/bin/env node

import program from 'commander';
import emoji from 'node-emoji';

import CommandExecutionService from '../services/CommandExecutionService';
import DistanceExceeds100MilesError from '../errors/DistanceExceeds100MilesError';

let service = new CommandExecutionService();

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .option('-u, --unit <unit>', 'specify distance unit')
  .parse(process.argv);

try {
  service.executePriceEstimates(program.start, program.end, program.unit)
         .then(table => console.log(table))
         .catch((e) => {
           if (isDistanceExceededError(e)) {
             console.log(`Maximum distance of ${emoji.get('100')}  miles exceeded between start address: ${program.start} and end address: ${program.end}`);
           } else {
             console.error('Could not get price estimates');
           }
         });
} catch (e) {
  console.error('Could not get price estimates');
}

const isUberError = error => {
  return error.name == 'Uber Error' &&
    error.hasOwnProperty('code') &&
    error.hasOwnProperty('error') &&
    'code' in error.error;
}

const isDistanceExceededError = error => {
  return isUberError(error) &&
    error.code == 422 &&
    error.error['code'] == 'distance_exceeded';
}
