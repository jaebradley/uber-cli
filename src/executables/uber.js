#!/usr/bin/env node

import program from 'commander';

import pkg from '../../package.json';

program.version(pkg.version)
       .command('price', 'get price estimate')
       .command('time <address>', 'get time to pickup estimate')
       .parse(process.argv);
