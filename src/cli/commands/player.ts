import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import mediaPlayer from '../../requests/mediaPlayer';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows media player data')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const mediaPlayerData = await mediaPlayer({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });
      const mediaPlayerString = JSON.stringify(mediaPlayerData, null, '  ');

      logger.info('Media Player: %s', mediaPlayerString);
    });
}
