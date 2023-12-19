import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import input from '../../requests/input';
import { getInputQuery, getInputQueryArgumentDefinition } from '../arguments/inputQuery';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Sends custom events to the current application.')
    .argument(...getInputQueryArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => input({
      query: getInputQuery(args) || '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
    }));
}
