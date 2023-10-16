import type { CreateCommandParameters, Command } from '@caporal/core';
import uploadApp from '../../actions/uploadApp';
import { envVariables } from '../../env/args';
import { getPath, getPathArgumentDefinition } from '../arguments/path';
import { getPassword, getPasswordOptionDefinition } from '../options/password';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Uploads archived (.zip) app to the Roku device.')
    .argument(...getPathArgumentDefinition('Path to the app archive file'))
    .option(...getPasswordOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => uploadApp({
      appArchivePath: getPath(args) || envVariables.APP_ARCHIVE_PATH || '',
      rokuDevPassword: getPassword(options) || envVariables.ROKU_DEV_PASSWORD || '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
    }));
}
