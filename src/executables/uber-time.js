#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

const service = new CommandExecutionService();


const addressArg = program.parse(process.argv);
if (!addressArg.args.length) {
  console.error('Error: Time requires an address');
}

program
  .arguments('<address>')
  .action((address) => {
    try {
      service.executeTimeEstimates(address)
        .then(table => console.log(table))
        .catch((e) => {
          console.error('Could not get time estimates:\n', e.message);
        });
    } catch (e) {
      console.error('Could not get time estimates:\n', e.message);
    }
  })
.parse(process.argv);
