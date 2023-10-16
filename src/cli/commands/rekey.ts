import type { CreateCommandParameters, Command } from '@caporal/core';
import rekeyDevice from '../../actions/rekey';
import { envVariables } from '../../env/args';
import { getPassword as getPasswordArgument, getPasswordArgumentDefinition } from '../arguments/password';
import { getPath, getPathArgumentDefinition } from '../arguments/path';
import { getPassword as getPasswordOption, getPasswordOptionDefinition } from '../options/password';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Rekey the Roku device with the given signed package and signing password.')
    .argument(...getPasswordArgumentDefinition())
    .argument(...getPathArgumentDefinition('Path to the signed package'))
    .option(...getPasswordOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => rekeyDevice({
      rokuDevPassword: getPasswordOption(options) || envVariables.ROKU_DEV_PASSWORD || '',
      rokuDevSigningPassword: getPasswordArgument(args) ||
        envVariables.ROKU_DEV_SIGNING_PASSWORD ||
        '',
      rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      signedPackagePath: getPath(args) ||
        envVariables.ALREADY_SIGNED_PACKAGE_PATH ||
        envVariables.SIGNED_PACKAGE_PATH ||
        '',
    }));
}
