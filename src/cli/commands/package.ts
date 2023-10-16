import type { CreateCommandParameters, Command } from '@caporal/core';
import generatePackage from '../../actions/generatePackage';
import { envVariables } from '../../env/args';
import { getAppName, getAppNameArgumentDefinition } from '../arguments/appName';
import { getPassword as getPasswordArgument, getPasswordArgumentDefinition } from '../arguments/password';
import { getPath, getPathArgumentDefinition } from '../arguments/path';
import { getPassword as getPasswordOption, getPasswordOptionDefinition } from '../options/password';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Creates and downloads packaged application.')
    .argument(...getAppNameArgumentDefinition())
    .argument(...getPathArgumentDefinition('Path to the Roku app archive'))
    .argument(...getPasswordArgumentDefinition())
    .option(...getPasswordOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => generatePackage({
      appName: getAppName(args) || envVariables.APP_NAME || '',
      rokuDevSigningPassword: getPasswordArgument(args) ||
        envVariables.ROKU_DEV_SIGNING_PASSWORD ||
        '',
      rokuDevPassword: getPasswordOption(options) || envVariables.ROKU_DEV_PASSWORD || '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      signedPackageFilePath: getPath(args) ||
        envVariables.GENERATED_SIGNED_PACKAGE_PATH ||
        envVariables.SIGNED_PACKAGE_PATH ||
        '',
    }));
}
