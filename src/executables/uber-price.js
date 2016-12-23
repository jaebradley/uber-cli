#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<start address> <end address>')
  .action((start, end) => {
    try {
      console.log(service.executePriceEstimate(start, end));
    } catch (Error) {
      console.error('Could not get price estimates for');
    }
  })
  .parse(process.argv);
