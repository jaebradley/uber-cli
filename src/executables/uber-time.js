#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program
  .arguments('<address>')
  .action(address => {
    try {
      console.log(service.executeTimeEstimates(address));
    } catch (Error) {
      console.error('Could not get time estimates for');
    }
  })
  .parse(process.argv);
