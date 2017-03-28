#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<address>')
  .action(address => {
    try {
        service.executeTimeEstimates(address)
               .then(table => console.log(table));
    } catch (Error) {
      console.error('Could not get time estimates:\n', Error.message);
    }
  })
  .parse(process.argv);

if (typeof address !== 'string') {
  console.error('Could not get time estimates:\n', "Address is required");
}
