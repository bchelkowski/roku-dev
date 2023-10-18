import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import registry from '../../requests/registry';
import { getChannelId, getChannelIdArgumentDefinition } from '../arguments/channelId';
import { getEscaped, getEscapedOptionDefinition } from '../options/escaped';
import { getKeys, getKeysOptionDefinition } from '../options/keys';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';
import { getSections, getSectionsOptionDefinition } from '../options/sections';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Lists the entries in the device registry for a sideloaded channel or production/beta channel linked to the Roku developer\'s account.')
    .argument(...getChannelIdArgumentDefinition())
    .option(...getEscapedOptionDefinition())
    .option(...getKeysOptionDefinition())
    .option(...getSectionsOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const keys = getKeys(options);
      const sections = getSections(options);
      const registryData = await registry({
        channelId: getChannelId(args) || envVariables.CHANNEL_ID || '',
        escaped: getEscaped(options),
        keys: keys ? keys.split('|') : undefined,
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
        sections: sections ? sections.split('|') : undefined,
      });

      console.table(registryData);

      const sectionsData = (registryData.registry as { sections: object | undefined })?.sections;
      if (sectionsData) {
        const sectionsString = JSON.stringify(sectionsData, null, ' ');

        console.log('sections: ', sectionsString);
      }
    });
}
