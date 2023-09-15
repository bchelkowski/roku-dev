import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import registry from '../../requests/registry';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getEscaped, getEscapedOptionDefinition } from '../options/escaped';
import { getKeys, getKeysOptionDefinition } from '../options/keys';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';
import { getSections, getSectionsOptionDefinition } from '../options/sections';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Shows performance data of active Roku App')
    .argument(...getChannelIdArgumentDefinition())
    .option(...getEscapedOptionDefinition())
    .option(...getKeysOptionDefinition())
    .option(...getSectionsOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, logger, options }) => {
      const keys = getKeys(options);
      const sections = getSections(options);
      const registryData = await registry({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        escaped: getEscaped(options),
        keys: keys ? keys.split('|') : undefined,
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
        sections: sections ? sections.split('|') : undefined,
      });
      const registryString = JSON.stringify(registryData, null, '  ');

      logger.info('Registry Data: %s', registryString);
    });
}
