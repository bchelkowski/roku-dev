import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import channelPerformance from '../../requests/channelPerformance';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns the current memory and CPU utilization of the channel running in the foreground (RAM usage is reported bytes).')
    .argument(...getChannelIdArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const channelPerformanceData = await channelPerformance({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      console.table(channelPerformanceData);
    });
}
