import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import channelPerformance from '../../requests/channelPerformance';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows performance data of active Roku App')
    .argument(...getChannelIdArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options, logger }) => {
      const channelPerformanceData = await channelPerformance({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });
      const channelPerformanceString = JSON.stringify(channelPerformanceData, null, '  ');

      logger.info('Channel Performance: %s', channelPerformanceString);
    });
}
