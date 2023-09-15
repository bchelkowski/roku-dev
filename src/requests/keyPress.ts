import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import { RokuRemoteKey } from '../utils/RokuRemoteKey.enum';
import RokuRequest from '../utils/RokuRequest';

export type KeyOptions = {
  key: RokuRemoteKey;
  keyboardKey?: string;
  rokuIP?: string;
  shouldNotEncode?: boolean;
};

export default (options: KeyOptions) => {
  let requestKey = options.key.toString();

  if (options.key === RokuRemoteKey.ONSCREEN_KEYBOARD && options.keyboardKey) {
    requestKey += `${options.shouldNotEncode ? options.keyboardKey : encodeURIComponent(options.keyboardKey)}`;
  }

  return new RokuRequest({
    method: RequestMethod.POST,
    path: `/keypress/${requestKey}`,
    port: RokuPort.ECP,
    rokuIP: options.rokuIP || args.rokuIP,
  }).send();
};
