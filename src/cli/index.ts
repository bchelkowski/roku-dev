#!/usr/bin/env node

import { program } from '@caporal/core';
import path from 'path';
import packageJson from '../../package.json';

program
  .name(packageJson.name)
  .version(packageJson.version)
  .description(packageJson.description)
  .discover(path.join(__dirname, './commands'));

program.run();
