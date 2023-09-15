import type { CreateCommandParameters, Command } from '@caporal/core';
import takeScreenshot from '../../actions/takeScreenshot';
import { envVariables } from '../../env/args';
import { getPath, getPathArgumentDefinition } from '../arguments/path';
import { getPassword, getPasswordOptionDefinition } from '../options/password';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Takes a screenshot of the dev app and download it to the JPG file')
    .argument(...getPathArgumentDefinition('Path of screenshot .jpg file'))
    .option(...getPasswordOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => takeScreenshot({
      rokuDevPassword: getPassword(options) || envVariables.ROKU_DEV_PASSWORD || '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      screenshotFilePath: getPath(args) || envVariables.SCREENSHOT_PATH || '',
    }));
}
