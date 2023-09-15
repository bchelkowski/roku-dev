import { WriteStream } from 'fs-extra';
import args from '../env/args';
import { RequestMethod } from '../utils/RequestMethod.enum';
import { RokuPort } from '../utils/RokuPort.enum';
import RokuRequest, { RokuRequestError } from '../utils/RokuRequest';

export type DownloadScreenshotOptions = {
  file: WriteStream;
  rokuDevPassword?: string;
  rokuIP?: string;
  screenshotUriPath: string;
};

export default async (options: DownloadScreenshotOptions): Promise<void> => {
  try {
    await new RokuRequest({
      auth: {
        password: options.rokuDevPassword || args.rokuDevPassword,
        user: 'rokudev',
      },
      method: RequestMethod.GET,
      path: `/${options.screenshotUriPath}`,
      port: RokuPort.GUI,
      rokuIP: options.rokuIP || args.rokuIP,
    }).send({ file: options.file });
  } catch (error) {
    const rokuError = error as RokuRequestError;

    if (rokuError.statusCode === 401) {
      throw new Error('Bad Roku Developer credentials.');
    } else if (rokuError.statusCode !== 200) {
      throw new Error(`Unknown error. HTTP status code: ${rokuError.statusCode}`);
    }
  }
};
