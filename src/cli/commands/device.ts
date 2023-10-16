import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import deviceInfo from '../../requests/deviceInfo';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Retrieves device information similar to that returned by roDeviceInfo')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const device = await deviceInfo({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('Device Info: %j', device);
    });
}
