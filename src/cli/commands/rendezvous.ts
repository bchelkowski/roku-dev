import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import rendezvous from '../../requests/rendezvous';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getCommand, getCommandArgumentDefinition } from '../arguments/command';

type CommandType = 'track' | 'untrack' | 'log';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Lists the node rendezvous events for a sideloaded channel or production/beta channel linked to the Roku developer\'s account.')
    .argument(...getCommandArgumentDefinition('Command for beacons', {
      default: 'log',
      validator: ['log', 'track', 'untrack'],
    }))
    .argument(...getChannelIdArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const _rendezvous = await rendezvous({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        command: getCommand<CommandType>(args),
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      if (_rendezvous.data && _rendezvous.data['tracking-enabled'] === 'true' && _rendezvous.data?.item) {
        console.table(_rendezvous.data.item);
      } else {
        console.table(_rendezvous);
      }
    });
}
