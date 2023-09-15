import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

const MESSAGE_FAILURE_REGEX = /<font.*>Failed: (.*)/;
const MESSAGE_SUCCESS_REGEX = /<a href="(pkgs\/[^.]+.pkg)">/;

export type SignPackageOptions = {
  appName: string;
  rokuDevPassword?: string;
  rokuDevSigningPassword: string;
  rokuIP?: string;
};

export default async (options: SignPackageOptions): Promise<string | undefined> => {
  try {
    const response = await new RokuRequest({
      auth: {
        password: options.rokuDevPassword || args.rokuDevPassword,
        user: 'rokudev',
      },
      method: RequestMethod.POST,
      path: '/plugin_package',
      port: RokuPort.GUI,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send({
      formData: {
        mysubmit: 'Package',
        app_name: options.appName,
        pkg_time: (new Date()).getTime().toString(),
        passwd: options.rokuDevSigningPassword,
      },
    });

    const failureReasonMatches = MESSAGE_FAILURE_REGEX.exec(response.body || '');

    if (failureReasonMatches) {
      throw new Error('Upload failed');
    }

    const pkgNameMatches = MESSAGE_SUCCESS_REGEX.exec(response.body || '');

    if (!pkgNameMatches) {
      throw new Error('Unknown error during signing the package');
    }

    return pkgNameMatches[1];
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 401) {
      throw new Error('Bad Roku Developer credentials.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
