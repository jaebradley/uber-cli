#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';
import SymbolService from '../services/symbols/SymbolService';

let service = new CommandExecutionService();

const symbolService = new SymbolService();

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
             console.log(`Maximum distance of ${symbolService.getMaximumDistanceSymbol()}  miles exceeded between start address: ${program.start} and end address: ${program.end}`);
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
    error.hasOwnProperty('error');
}

const isDistanceExceededError = error => {
  return isUberError(error) &&
    error.code == 422 &&
    'code' in error.error &&
    error.error['code'] == 'distance_exceeded';
}
