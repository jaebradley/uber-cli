#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<start address> <end address>')
  .action((start, end) => {
    try {
      return service.executePriceEstimates(start, end)
                    .then(table => console.log(table));
    } catch (Error) {
      console.error('Could not get price estimates');
    }
  })
  .parse(process.argv);
