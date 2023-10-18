import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import activeApp from '../../requests/activeApp';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows data of the current active app')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ options }) => {
      const apps = await activeApp({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      console.table(apps);
    });
}
