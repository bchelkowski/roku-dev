import { ReadStream } from 'fs-extra';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

const MESSAGE_REKEY_SUCCESS = 'Success.';
const MESSAGE_REGEX = /<font color="red">([^<]+)<\/font>/;

export type RekeyDeviceOptions = {
  rokuDevPassword?: string;
  rokuDevSigningPassword: string;
  rokuIP?: string;
  signedPackage: ReadStream;
};

export default async (options: RekeyDeviceOptions): Promise<void> => {
  try {
    const response = await new RokuRequest({
      auth: {
        password: options.rokuDevPassword || args.rokuDevPassword,
        user: 'rokudev',
      },
      method: RequestMethod.POST,
      path: '/plugin_inspect',
      port: RokuPort.GUI,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send({
      formData: { mysubmit: 'Rekey', archive: options.signedPackage, passwd: options.rokuDevSigningPassword },
      isSendingFile: true,
    });

    const resultTextSearch = MESSAGE_REGEX.exec(response.body || '');

    if (!resultTextSearch) {
      throw new Error('Unknown Rekey Failure');
    }

    if (resultTextSearch[1] !== MESSAGE_REKEY_SUCCESS) {
      throw new Error(`Rekey Failure: ${resultTextSearch[1]}`);
    }
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 401) {
      throw new Error('Bad Roku Developer credentials.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
