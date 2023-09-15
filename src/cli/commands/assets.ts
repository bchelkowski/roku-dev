import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import assets from '../../requests/assets';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns current assets saved in memory')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const _assets = await assets({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('Assets: %j', _assets);
    });
}
