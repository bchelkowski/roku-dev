import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import assets from '../../requests/assets';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns a list of the assets that have been loaded into texture memory')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ options }) => {
      const _assets = await assets({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      console.table(_assets);
    });
}
