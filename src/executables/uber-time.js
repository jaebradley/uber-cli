#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

const service = new CommandExecutionService();

const address = program.args[0].trim().toString();
program
  .arguments('<address>')
  .action((address) => {
    try {
      service.executeTimeEstimates(address)
        .then(table => console.log(table))
        .catch((e) => {
          console.log('Could not get time estimates:\n', e.message);
        });
    } catch (e) {
      console.error('Could not get time estimates:\n', e.message);
    }
  })
.parse(process.argv);