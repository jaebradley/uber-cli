#!/usr/bin/env node

import program from 'commander';

program.version('0.0.1')
       .command('price', 'get price estimate')
       .command('time', 'get time to pickup estimate')
       .parse(process.argv);
