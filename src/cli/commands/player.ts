import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import mediaPlayer, { MediaPlayerType } from '../../requests/mediaPlayer';
import { getField, getFieldArgumentDefinition } from '../arguments/field';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Returns a child element named \'player\' that identifies the media player state.')
    .argument(...getFieldArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const mediaPlayerData = await mediaPlayer({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      const field = getField(args) as keyof MediaPlayerType;
      if (field && mediaPlayerData[field]) {
        console.table(mediaPlayerData[field]);
      } else {
        console.table(mediaPlayerData);
      }
    });
}
