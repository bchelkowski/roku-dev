import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import installedApps from '../../requests/installedApps';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows data of all installed apps')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const apps = await installedApps({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('Installed Apps: %j', apps);
    });
}
