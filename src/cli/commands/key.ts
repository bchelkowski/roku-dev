import type { CreateCommandParameters, Command } from '@caporal/core';
import { envVariables } from '../../env/args';
import keyDown from '../../requests/keyDown';
import keyPress from '../../requests/keyPress';
import keyUp from '../../requests/keyUp';
import { RokuRemoteKey } from '../../utils/RokuRemoteKey.enum';
import { getKey, getKeyArgumentDefinition } from '../arguments/key';
import { getType, getTypeArgumentDefinition } from '../arguments/type';
import { getEscaped, getEscapedOptionDefinition } from '../options/escaped';
import { getRokuIP, getRokuIPOptionDefinition } from '../options/rokuIP';

const KeyRequest = {
  down: keyDown,
  press: keyPress,
  up: keyUp,
};

type KeyType = 'down' | 'press' | 'up';

export default function ({ createCommand }: CreateCommandParameters): Command {
  return createCommand('Download an icon for the specific Roku app')
    .argument(...getKeyArgumentDefinition())
    .argument(...getTypeArgumentDefinition('Type of key event - can be: down, up or press', {
      default: 'down',
      validator: ['down', 'press', 'up'],
    }))
    .option(...getEscapedOptionDefinition())
    .option(...getRokuIPOptionDefinition())
    .action(({ args, options }) => {
      let key = getKey(args);
      let keyboardKey;
      const keyRequest = KeyRequest[getType<KeyType>(args)];
      const rokuIP = getRokuIP(options) || envVariables.ROKU_IP || '';

      if (key.length === 1) {
        key = RokuRemoteKey.ONSCREEN_KEYBOARD;
        keyboardKey = key;
      }

      return keyRequest({
        key: key as RokuRemoteKey,
        keyboardKey,
        rokuIP,
        shouldNotEncode: !getEscaped(options),
      });
    });
}
