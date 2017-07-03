#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

const service = new CommandExecutionService();

program
  .usage('<address>')
  .description('Get Time-To-Pickup Estimates')
  .parse(process.argv);

const address = program.args.toString();

if (!address) {
  program.outputHelp();
} else {
  try {
    service.executeTimeEstimates(address)
      .then(table => console.log(table))
      .catch((e) => {
        console.error('Could not get time estimates:\n', e.message);
      });
  } catch (e) {
    console.error('Could not get time estimates:\n', e.message);
  }
}
