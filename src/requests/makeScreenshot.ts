import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

const SCREENSHOT_URI_PATH = /"(pkgs\/dev\.jpg\?time=\d+)">/;

export type MakeScreenshotOptions = {
  rokuDevPassword?: string;
  rokuIP?: string;
};

export default async (options?: MakeScreenshotOptions): Promise<string | undefined> => {
  try {
    const response = await new RokuRequest({
      auth: {
        password: args.rokuDevPassword || options?.rokuDevPassword,
        user: 'rokudev',
      },
      method: RequestMethod.POST,
      path: '/plugin_inspect',
      port: RokuPort.GUI,
      rokuIP: options?.rokuIP || args.rokuIP,
    }).send({ formData: { mysubmit: 'Screenshot' } });
    const [, screenshotUriPath] = response.body?.match(SCREENSHOT_URI_PATH) || [];

    if (!screenshotUriPath) {
      throw new Error('Are you sure that you have launched the dev app and the screensaver is off?');
    }

    return screenshotUriPath;
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 401) {
      throw new Error('Bad Roku Developer credentials.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode} \n ${rokuError.message}`);
    }
  }
};
