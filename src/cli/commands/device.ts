import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import deviceInfo, { DeviceInfoType } from '../../requests/deviceInfo';
import { getField, getFieldArgumentDefinition } from '../arguments/field';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Retrieves device information similar to that returned by roDeviceInfo')
    .argument(...getFieldArgumentDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(async ({ args, options }) => {
      const device = await deviceInfo({
        rokuIP: getRokuIP(options) || envVariables.ROKU_IP || '',
      });

      const field = getField(args) as keyof DeviceInfoType;
      if (field && device[field]) {
        console.table(device[field]);
      } else {
        console.table(device);
      }
    });
}
