import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import launch from '../../requests/launch';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getContentId, getContentIdOptionDefinition } from '../options/contentId';
import { getMediaType, getMediaTypeOptionDefinition } from '../options/mediaType';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Launches Roku App')
    .argument(...getChannelIdArgumentDefinition())
    .option(...getContentIdOptionDefinition())
    .option(...getMediaTypeOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => launch({
      channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
      contentId: getContentId(options),
      mediaType: getMediaType(options),
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
    }));
}
