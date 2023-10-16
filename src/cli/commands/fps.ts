import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import graphicsFrameRate from '../../requests/graphicsFrameRate';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns the recent number of rendered graphics frames per seconds (this value is separate from the video frame rate).')
    .option(...getRokuIPOptionDefinition())
    .action(async ({ logger, options }) => {
      const fps = await graphicsFrameRate({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('FPS: %j', fps);
    });
}
