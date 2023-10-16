import type { CreateCommandParameters, Command } from '@caporal/core';
import icon from '../../actions/icon';
import { envVariables } from '../../env/args';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getPath, getPathArgumentDefinition } from '../arguments/path';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Downloads under iconPath an icon file corresponding to the application identified by channelId.')
    .argument(...getChannelIdArgumentDefinition())
    .argument(...getPathArgumentDefinition('Path for Roku app icon .jpg file'))
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => icon({
      channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
      iconPath: getPath(args) || envVariables.ICON_PATH || '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
    }));
}
