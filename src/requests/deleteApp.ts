import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

export type DeleteAppOptions = {
  rokuDevPassword?: string;
  rokuIP?: string;
};

export default async (options?: DeleteAppOptions): Promise<void> => {
  try {
    await new RokuRequest({
      auth: {
        password: args.rokuDevPassword || options?.rokuDevPassword,
        user: 'rokudev',
      },
      method: RequestMethod.POST,
      path: '/plugin_install',
      port: RokuPort.GUI,
      rokuIP: options?.rokuIP || args.rokuIP,
    }).send({ formData: { mysubmit: 'Delete', archive: '' } });
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 401) {
      throw new Error('Bad Roku Developer credentials.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
