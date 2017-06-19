#!/usr/bin/env node

/* eslint-disable no-console */

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

const service = new CommandExecutionService();

const address = program.args[0].trim().toString();
program
  .arguments('<address>')
  .action((address) => {
    if (!address.length) {
        throw new TypeError('Address is required');
    try {
      service.executeTimeEstimates(address).then(table => console.log(table));
    } catch (Error) {
      console.error('Could not get time estimates');
    }
    service.executeTimeEstimates(address)
        .then(table => console.log(table));
} catch (Error) {
    console.error('Could not get time estimates:\n', Error.message);
}
