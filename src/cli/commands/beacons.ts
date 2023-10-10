import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import beacons from '../../requests/beacons';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getCommand, getCommandArgumentDefinition } from '../arguments/command';

type CommandType = 'track' | 'untrack' | 'log';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Command for managing beacons')
    .argument(...getChannelIdArgumentDefinition())
    .argument(...getCommandArgumentDefinition('Command for beacons', {
      default: 'log',
      validator: ['log', 'track', 'untrack'],
    }))
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, logger, options }) => {
      const _beacons = await beacons({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        command: getCommand<CommandType>(args),
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      logger.info('Beacons: %j', _beacons);
    });
}
