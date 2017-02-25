#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';
import Unit from '../data/Unit';

let service = new CommandExecutionService();

program
  .option('-s, --start <start>', 'specify start address')
  .option('-e, --end <end>', 'specify end address')
  .option('-k, --kilometers', 'use kilometers instead of miles')
  .parse(process.argv);

let distanceUnit = Unit.MILE;
if (program.kilometers) {
  distanceUnit = Unit.KILOMETER;
}

try {
  service.executePriceEstimates(program.start, program.end, distanceUnit)
         .then(table => console.log(table));
} catch (Error) {
  console.error('Could not get price estimates');
}
