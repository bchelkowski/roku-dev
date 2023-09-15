import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import graphicsFrameRate from '../../requests/graphicsFrameRate';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows Frames Per Second')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const fps = await graphicsFrameRate({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('FPS: %j', fps);
    });
}
