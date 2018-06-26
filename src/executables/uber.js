#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
  .description('Figure out if you should order a car to pick you up and drive you to where you want to go')
  .command('price', 'get price estimate')
  .command('time', 'get time to pickup estimate')
  .parse(process.argv);
