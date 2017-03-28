#!/usr/bin/env node

import program from 'commander';

import CommandExecutionService from '../services/CommandExecutionService';

let service = new CommandExecutionService();

program.parse(process.argv);

var address = program.args.toString();
try {
    if (!address.length) {
        throw new TypeError('Address is required');
    }
    service.executeTimeEstimates(address)
        .then(table => console.log(table));
} catch (Error) {
    console.error('Could not get time estimates:\n', Error.message);
}
